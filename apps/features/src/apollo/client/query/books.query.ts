import { graphql } from "@/graphql";

export const booksQuery = graphql(`
  query QBooks {
    books {
      id
      title
      author
    }
  }
`);
