import { graphql } from "@/apollo/gql";

export const pokemonFragment = graphql(`
  fragment FPokemon on Pokemon {
    __typename
    id
    name
    name_id
    order
    genera
    color
    flavor_text
    images {
      __typename
      front_default
      front_shiny
      back_default
      back_shiny
      official_default
      official_shiny
    }
    abilities {
      ...FPokemonAbilities
    }
  }
`);
