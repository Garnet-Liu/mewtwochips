/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { PokemonAbilities } from "./abilitie/resolvers/PokemonAbilities";
import { check as Mutation_check } from "./base/resolvers/Mutation/check";
import { checks as Query_checks } from "./base/resolvers/Query/checks";
import { Pokemon } from "./pokemon/resolvers/Pokemon";
import { PokemonImages } from "./pokemon/resolvers/PokemonImages";
import { PokemonPage } from "./pokemon/resolvers/PokemonPage";
import { pokemon as Query_pokemon } from "./pokemon/resolvers/Query/pokemon";
import { pokemonAll as Query_pokemonAll } from "./pokemon/resolvers/Query/pokemonAll";
import { PokemonStats } from "./stats/resolvers/PokemonStats";
import type { Resolvers } from "./types.generated";
export const resolvers: Resolvers = {
  Query: { checks: Query_checks, pokemon: Query_pokemon, pokemonAll: Query_pokemonAll },
  Mutation: { check: Mutation_check },

  Pokemon: Pokemon,
  PokemonAbilities: PokemonAbilities,
  PokemonImages: PokemonImages,
  PokemonPage: PokemonPage,
  PokemonStats: PokemonStats,
};
