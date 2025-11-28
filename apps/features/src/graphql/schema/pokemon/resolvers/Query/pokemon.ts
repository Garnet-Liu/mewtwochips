import type { Pokemon, QueryResolvers } from "./../../../types.generated";

export const pokemon: NonNullable<QueryResolvers['pokemon']> = async (
  _parent,
  { id, name },
  ctx,
) => {
  /* Implement Query.pokemon resolver logic here */
  return (await ctx.pokemon.getPokemon({ id, name })) as Pokemon;
};
