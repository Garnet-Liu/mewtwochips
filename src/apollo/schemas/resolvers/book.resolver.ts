import { sleep } from "@/lib/sleep";
import { IContext } from "@/types/api/graphql";
import { Resolvers } from "@/apollo/gql/graphql";

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

export const bookResolver: Resolvers<IContext> = {
  Query: {
    books: () => books,
    book: (_, { id }) => {
      return books.find((b) => b.id === id) ?? null;
    },
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      await sleep(3000);

      const book = {
        id: String(books.length + 1),
        title,
        author,
      };
      books.push(book);

      return book;
    },
  },
};
