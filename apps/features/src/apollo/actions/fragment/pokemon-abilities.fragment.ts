import { graphql } from "@/graphql";

export const PokemonAbilitiesFragment = graphql(`
  fragment FPokemonAbilities on PokemonAbilities {
    __typename
    id
    name
    name_id
    entries
    is_hidden
  }
`);
