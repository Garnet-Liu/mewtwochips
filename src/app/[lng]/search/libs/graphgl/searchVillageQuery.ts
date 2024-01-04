import { graphql } from "@/gql";

export const QuerySearchVillage = graphql(`
  query queryVillage($tag: String!) {
    village(tag: $tag) {
      __typename
      ... on TClientError {
        reason
        message
      }
      ... on TVillage {
        tag
        name
        clan {
          tag
          name
          badgeUrls {
            medium
          }
        }
        league {
          id
          name
          iconUrls {
            medium
          }
        }
      }
    }
  }
`);
