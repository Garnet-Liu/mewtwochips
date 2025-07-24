import { graphql } from "@/graphql";

export const bookQuery = graphql(`
  query QBook($id: String!) {
    book(id: $id) {
      id
      title
      author
    }
  }
`);
