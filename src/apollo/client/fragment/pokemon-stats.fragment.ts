import { graphql } from "@/apollo/gql";

export const pokemonStatsFragment = graphql(`
  fragment FPokemonStats on PokemonStats {
    __typename
    id
    name
    name_id
    base_stat
  }
`);
