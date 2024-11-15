import { RESTDataSource } from "@apollo/datasource-rest";
import { v5 as uuidv5 } from "uuid";
import DataLoader from "dataloader";
import {
  Ability,
  NamedAPIResource,
  NamedAPIResourceList,
  Pokemon,
  PokemonSpecies,
  Stat,
} from "pokenode-ts";

import { Maybe } from "@/types/maybe";
import { Pokemon as GPokemon, PokemonPage, StatsType } from "@/apollo/gql/graphql";

const LANGUAGE = ["zh-Hans", "zh-Hant", "ja", "en"];

const statsType = new Map([
  ["hp", StatsType.Hp],
  ["speed", StatsType.Speed],
  ["attack", StatsType.Attack],
  ["defense", StatsType.Defense],
  ["special-attack", StatsType.SpecialAttack],
  ["special-defense", StatsType.SpecialDefense],
]);

interface PokemonArgs {
  id?: Maybe<string>;
  url?: Maybe<string>;
  name?: Maybe<string>;
}

export class PokemonDataSource extends RESTDataSource {
  override baseURL = "https://pokeapi.co";

  async getPokemonPage(offset: number, limit: number): Promise<PokemonPage> {
    return this.get<NamedAPIResourceList>(`/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(
      async (list) => {
        return {
          count: list.count,
          limit: limit,
          offset: offset,
          results: await this.queryArrayObject(list.results, (p) => {
            return this.pokemonLoad.load({ name: p.name, url: p.url });
          }),
        };
      },
    );
  }

  async getPokemon(args: PokemonArgs) {
    console.log("========> get pokemon args", args);
    return this.pokemonLoad.load(args);
  }

  private pokemonLoad = new DataLoader<PokemonArgs, GPokemon>(async (names) => {
    return this.queryArrayObject([...names], async (p) => {
      return await this.queryPokemon(p);
    });
  });

  private async queryPokemon(args: PokemonArgs): Promise<GPokemon> {
    return this.get<Pokemon>(this.switchQueryUrl(args, `/api/v2/pokemon/`)).then(
      async (pokemon) => {
        const pokemonID = `${pokemon.name}-${pokemon.id}`;
        const abilities = await this.queryArrayObject(pokemon.abilities, async (a) => {
          const result = await this.queryAbilities({ name: a.ability.name, url: a.ability.url });
          return {
            ...result,
            id: uuidv5(`${pokemonID}-${a.ability.name}`, uuidv5.URL),
            is_hidden: a.is_hidden,
          };
        });

        const species = await this.queryPokemonSpecies({
          name: pokemon.species.name,
          url: pokemon.species.url,
        });

        const stats = await this.queryArrayObject(pokemon.stats, async (s) => {
          const result = await this.queryStats({ name: s.stat.name, url: s.stat.url });
          return {
            ...result,
            id: uuidv5(`${pokemonID}-${s.stat.name}`, uuidv5.URL),
            base_stat: s.base_stat,
          };
        });

        return {
          id: uuidv5(pokemonID, uuidv5.URL),
          ...species,
          name_id: pokemon.name,
          order: pokemon.id,
          stats: stats,
          images: {
            front_default: pokemon.sprites.front_default,
            front_shiny: pokemon.sprites.front_shiny,
            back_default: pokemon.sprites.back_default,
            back_shiny: pokemon.sprites.back_shiny,
            official_default: pokemon.sprites.other?.["official-artwork"].front_default,
            official_shiny: pokemon.sprites.other?.["official-artwork"].front_shiny,
            dream_default: pokemon.sprites.other?.dream_world.front_default,
          },
          weight: pokemon.weight,
          abilities: abilities,
        };
      },
    );
  }

  private async queryAbilities(args: PokemonArgs) {
    return this.get<Ability>(this.switchQueryUrl(args, `/api/v2/ability/`)).then((ability) => {
      const abilityValue = this.findLanguageValue(ability.names);
      const entries = this.findLanguageValue(ability.flavor_text_entries);
      if (ability) {
        return {
          id: uuidv5(ability.name, uuidv5.URL),
          name: abilityValue?.name,
          name_id: ability.name,
          entries: entries?.flavor_text,
        };
      } else {
        return null;
      }
    });
  }

  private async queryStats(args: PokemonArgs) {
    return this.get<Stat>(this.switchQueryUrl(args, `/api/v2/stat/`)).then((stat) => {
      if (stat) {
        return {
          id: uuidv5(stat.name, uuidv5.URL),
          name: this.findLanguageValue(stat.names)?.name,
          name_id: statsType.get(stat.name),
        };
      } else {
        return null;
      }
    });
  }

  private async queryPokemonSpecies(args: PokemonArgs) {
    return this.get<PokemonSpecies>(this.switchQueryUrl(args, `/api/v2/pokemon-species/`)).then(
      (species) => {
        return {
          color: species.color?.name,
          name: this.findLanguageValue(species.names)?.name,
          genera: this.findLanguageValue(species.genera)?.genus,
          flavor_text: this.findLanguageValue(species.flavor_text_entries)?.flavor_text,
        };
      },
    );
  }

  private findLanguageValue<T extends { language: NamedAPIResource }>(data: T[]): Maybe<T> {
    for (let i = 0; i < LANGUAGE.length; i++) {
      const lang = LANGUAGE[i];

      const langValue = data?.find((d) => {
        return d.language.name.includes(lang);
      });

      if (langValue) {
        return langValue;
      }
    }
  }

  private async queryArrayObject<T, R>(object: Array<T>, callback: (item: T) => Promise<R>) {
    return await Promise.allSettled(object.map(callback)).then((a) => {
      return a.map((r) => {
        if (r.status === "fulfilled") {
          return r.value;
        } else {
          return r.reason as Error;
        }
      });
    });
  }

  private switchQueryUrl({ name, url, id }: PokemonArgs, defaultUrl: string) {
    return url ? url : `${defaultUrl}${id ?? name}`;
  }
}
