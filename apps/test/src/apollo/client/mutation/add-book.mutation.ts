import { graphql } from "@/apollo/gql";

export const addBookMutation = graphql(`
  mutation MAddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      ...FBook
    }
  }
`);
