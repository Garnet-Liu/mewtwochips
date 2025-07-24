import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { NextRequest } from "next/server";

import { resolvers } from "@/apollo/schemas/resolvers";
import { PokemonDataSource } from "@/apollo/schemas/source";
import { typeDefs } from "@/apollo/schemas/type-defs";
import { IContext } from "@/apollo/types/graphql";

const server = new ApolloServer<IContext>({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

const handler = startServerAndCreateNextHandler<NextRequest, IContext>(server, {
  context: async () => {
    const { cache } = server;
    return { pokemon: new PokemonDataSource({ cache }) };
  },
});

export const GET = async (request: NextRequest) => {
  return await handler(request);
};

export const POST = async (request: NextRequest) => {
  return await handler(request);
};
