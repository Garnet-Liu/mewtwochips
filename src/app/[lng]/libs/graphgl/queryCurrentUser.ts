import { graphql } from "@/gql";

export const QueryCurrentUser = graphql(`
  query queryCurrentUser {
    currentUser {
      __typename
    }
  }
`);
