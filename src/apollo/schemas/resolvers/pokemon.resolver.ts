import { IContext } from "@/types/api/graphql";
import { Resolvers } from "@/apollo/gql/graphql";

export const pokemonResolver: Resolvers<IContext> = {
  Query: {
    pokemonAll: (_, { offset, limit }, ctx) => {
      return ctx.pokemon.getPokemonPage(offset, limit);
    },
    pokemon: (_, { id, name }, ctx) => {
      return ctx.pokemon.getPokemon({ id, name });
    },
  },
};
