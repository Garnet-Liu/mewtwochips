import type { PokemonPage, QueryResolvers } from "./../../../types.generated";

export const pokemonAll: NonNullable<QueryResolvers["pokemonAll"]> = async (
  _parent,
  { offset, limit },
  ctx,
) => {
  /* Implement Query.pokemonAll resolver logic here */
  return (await ctx.pokemon.getPokemonPage(offset, limit)) as PokemonPage;
};
