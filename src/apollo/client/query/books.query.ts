import { graphql } from "@/apollo/gql";

export const booksQuery = graphql(`
  query QBooks {
    books {
      id
      title
      author
    }
  }
`);
