import { graphql } from "@/graphql";

export const PokemonStatsFragment = graphql(`
  fragment FPokemonStats on PokemonStats {
    __typename
    id
    name
    name_id
    base_stat
  }
`);
