import { IContext } from "@/types/api/graphql";
import { Pokemon, PokemonPage, Resolvers } from "@/apollo/gql/graphql";

export const pokemonResolver: Resolvers<IContext> = {
  Query: {
    pokemonAll: (_, { offset, limit }, ctx) => {
      return ctx.pokemon.getPokemonPage(offset, limit) as PokemonPage;
    },
    pokemon: (_, { id, name }, ctx) => {
      return ctx.pokemon.getPokemon({ id, name }) as Pokemon;
    },
  },
};
