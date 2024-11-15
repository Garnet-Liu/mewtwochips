import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";

import { auth } from "@/next-auth/auth";
import { IContext } from "@/types/api/graphql";
import { typeDefs } from "@/apollo/schemas/type-defs";
import { resolvers } from "@/apollo/schemas/resolvers";
import { PokemonDataSource } from "@/apollo/schemas/source";

const server = new ApolloServer<IContext>({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

type NextAuthRequest = Parameters<Parameters<typeof auth>[0]>[0];

const handler = startServerAndCreateNextHandler<NextAuthRequest, IContext>(server, {
  context: async (req) => {
    console.log("======> startServerAndCreateNextHandler req token", !!req.auth?.user?.idToken);
    console.log("req url", req.url);
    console.log("req body", req.body);
    const { cache } = server;
    return {
      pokemon: new PokemonDataSource({ cache }),
    };
  },
});

export const GET = auth(async (request) => {
  return await handler(request);
});

export const POST = auth(async (request) => {
  return await handler(request);
});
