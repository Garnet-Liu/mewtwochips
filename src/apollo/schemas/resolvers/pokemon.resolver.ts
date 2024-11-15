import { IResolvers } from "@graphql-tools/utils";

export const pokemonResolver: IResolvers = {
  Query: {
    pokemonAll: (_, { offset, limit }, ctx) => {
      return ctx.pokemon.getPokemonPage(offset, limit);
    },
    pokemon: (_, { id, name }, ctx) => {
      return ctx.pokemon.getPokemon({ id, name });
    },
  },
};
