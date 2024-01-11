import { graphql } from "@/gql";

export const QuerySearchVillage = graphql(`
  query querySearchVillage($tag: String!) {
    village(tag: $tag) {
      __typename
      ... on ClientError {
        reason
        message
      }
      ... on Village {
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
