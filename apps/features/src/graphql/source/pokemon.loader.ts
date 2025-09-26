import { RESTDataSource } from "@apollo/datasource-rest";
import type { Maybe } from "@repo/ui/lib/maybe";
import DataLoader from "dataloader";
import type {
  Ability,
  NamedAPIResource,
  NamedAPIResourceList,
  Pokemon,
  PokemonSpecies,
  Stat,
} from "pokenode-ts";
import { v5 as uuidv5 } from "uuid";

export const LANGUAGE = ["zh-Hans", "zh-Hant", "ja", "en"];

export interface PokemonArgs {
  id?: Maybe<string>;
  url?: Maybe<string>;
  name?: Maybe<string>;
}

function toScreamingSnakeCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // 在小写字母或数字与大写字母之间插入下划线
    .replace(/[\s-]+/g, "_") // 将空格或连字符替换为下划线
    .toUpperCase(); // 转换为大写
}

export class PokemonDataSource extends RESTDataSource {
  override baseURL = "https://pokeapi.co";

  async getPokemonPage(offset: number, limit: number) {
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
    console.log("<========= get pokemon args", args);
    return this.pokemonLoad.load(args);
  }

  private pokemonLoad = new DataLoader<PokemonArgs, Awaited<ReturnType<typeof this.queryPokemon>>>(
    async (names) => {
      return this.queryArrayObject([...names], async (p) => {
        return await this.queryPokemon(p);
      });
    },
  );

  private async queryPokemon(args: PokemonArgs) {
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
            // official_shiny: pokemon.sprites.other?.["official-artwork"].front_shiny,
            official_shiny: 'pokemon.sprites.other?.["official-artwork"].front_shiny',
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
          name_id: toScreamingSnakeCase(stat.name),
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
      const lang = LANGUAGE[i] as string;

      const langValue = data?.find((d) => {
        return d.language.name.includes(lang);
      });

      if (langValue) {
        return langValue;
      }
    }
  }

  private async queryArrayObject<T, R>(
    array: Array<T>,
    callback: (i: T) => Promise<R>,
  ): Promise<Array<R>> {
    return await Promise.allSettled(array.map(callback)).then((a) => {
      return a.map((r) => {
        return r.status === "fulfilled" ? r.value : r.reason;
      });
    });
  }

  private switchQueryUrl({ name, url, id }: PokemonArgs, defaultUrl: string) {
    return url ? url : `${defaultUrl}${id ?? name}`;
  }
}
