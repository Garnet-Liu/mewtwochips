import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { IContext } from "@/types/api/graphql";
import { typeDefs } from "@/apollo/schemas/type-defs";
import { resolvers } from "@/apollo/schemas/resolvers";
import { PokemonDataSource } from "@/apollo/schemas/source";

const server = new ApolloServer<IContext>({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

const handler = startServerAndCreateNextHandler<NextRequest, IContext>(server, {
  context: async (req) => {
    console.log("<========= startServerAndCreateNextHandler idToken");
    console.log("req url", req.url);
    console.log("req body", req.body);
    const { cache } = server;
    return { pokemon: new PokemonDataSource({ cache }) };
  },
});

export const GET = async (request: NextRequest) => {
  console.log("startServerAndCreateNextHandler", request.cookies);
  return await handler(request);
};

export const POST = async (request: NextRequest) => {
  console.log("startServerAndCreateNextHandler", request.cookies);
  return await handler(request);
};
