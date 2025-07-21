import { graphql } from "@/apollo/gql";

export const pokemonQuery = graphql(`
  query QPokemon($id: ID, $name: String) {
    pokemon(id: $id, name: $name) {
      ...FPokemon
      stats {
        ...FPokemonStats
      }
    }
  }
`);
