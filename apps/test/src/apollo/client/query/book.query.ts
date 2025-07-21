import { graphql } from "@/apollo/gql";

export const bookQuery = graphql(`
  query QBook($id: String!) {
    book(id: $id) {
      id
      title
      author
    }
  }
`);
