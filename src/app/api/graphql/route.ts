import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { typeDefs } from "@/apollo/schemas/type-defs";
import { resolvers } from "@/apollo/schemas/resolvers";
import { PokemonDataSource } from "@/apollo/schemas/source";

interface IContext {
  pokemon: PokemonDataSource;
}

const server = new ApolloServer<IContext>({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

const handler = startServerAndCreateNextHandler<NextRequest, IContext>(server, {
  context: async () => {
    const { cache } = server;
    return {
      pokemon: new PokemonDataSource({ cache }),
    };
  },
});

export async function GET(request: NextRequest) {
  return await handler(request);
}

export async function POST(request: NextRequest) {
  return await handler(request);
}
