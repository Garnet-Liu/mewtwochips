import { IResolvers } from "@graphql-tools/utils";

const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const bookResolver: IResolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => {
      return books.find((b) => b.id === id);
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const book = {
            id: String(books.length + 1),
            title,
            author,
          };
          books.push(book);
          resolve(book);
        }, 2000);
      });
    },
  },
};
