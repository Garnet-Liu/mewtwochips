import { graphql } from "@/apollo/gql";

export const pokemonAbilitiesFragment = graphql(`
  fragment FPokemonAbilities on PokemonAbilities {
    __typename
    id
    name
    name_id
    entries
    is_hidden
  }
`);
