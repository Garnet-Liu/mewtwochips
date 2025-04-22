import { graphql } from "@/apollo/gql";

export const bookFragment = graphql(`
  fragment FBook on Book {
    __typename
    id
    title
    author
  }
`);
