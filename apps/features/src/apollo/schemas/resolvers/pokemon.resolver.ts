import { IContext } from "@/apollo/types/graphql";
import { Resolvers } from "@/graphql/generated-resolvers";
import { Pokemon, PokemonPage } from "@/graphql/graphql";

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
