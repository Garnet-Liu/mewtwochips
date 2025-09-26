import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import type { MyContext } from "@/graphql/context";
import { resolvers } from "@/graphql/schema/resolvers.generated";
import { typeDefs } from "@/graphql/schema/typeDefs.generated";
import { PokemonDataSource } from "@/graphql/source";

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest, MyContext>(server, {
  context: async () => {
    const { cache } = server;
    return { pokemon: new PokemonDataSource({ cache }), userID: "" };
  },
});

export const GET = async (request: NextRequest) => {
  return await handler(request);
};

export const POST = async (request: NextRequest) => {
  return await handler(request);
};
