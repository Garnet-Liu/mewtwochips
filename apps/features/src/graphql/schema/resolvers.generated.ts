/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { checks as Query_checks } from './base/resolvers/Query/checks';
import    { pokemon as Query_pokemon } from './pokemon/resolvers/Query/pokemon';
import    { pokemonAll as Query_pokemonAll } from './pokemon/resolvers/Query/pokemonAll';
import    { check as Mutation_check } from './base/resolvers/Mutation/check';
import    { Pokemon } from './pokemon/resolvers/Pokemon';
import    { PokemonAbilities } from './abilitie/resolvers/PokemonAbilities';
import    { PokemonImages } from './pokemon/resolvers/PokemonImages';
import    { PokemonPage } from './pokemon/resolvers/PokemonPage';
import    { PokemonStats } from './stats/resolvers/PokemonStats';
    export const resolvers: Resolvers = {
      Query: { checks: Query_checks,pokemon: Query_pokemon,pokemonAll: Query_pokemonAll },
      Mutation: { check: Mutation_check },
      
      Pokemon: Pokemon,
PokemonAbilities: PokemonAbilities,
PokemonImages: PokemonImages,
PokemonPage: PokemonPage,
PokemonStats: PokemonStats
    }