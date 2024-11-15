import { graphql } from "@/apollo/gql";

export const allPokemonQuery = graphql(`
  query QAllPokemon($offset: Int!, $limit: Int!) {
    pokemonAll(offset: $offset, limit: $limit) {
      __typename
      count
      limit
      offset
      results {
        ...FPokemon
      }
    }
  }
`);
