import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import {
  defaultFieldResolver,
  GraphQLError,
  type GraphQLFieldConfig,
  GraphQLSchema,
} from "graphql";
import { NextRequest } from "next/server";

import type { MyContext } from "@/graphql/context";
import { resolvers } from "@/graphql/schema/resolvers.generated";
import { typeDefs } from "@/graphql/schema/typeDefs.generated";
import { PokemonDataSource } from "@/graphql/source"; // This function takes in a schema and adds upper-casing logic

function authDirectiveTransformer<GS extends GraphQLSchema>(schema: GS, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.ROOT_FIELD]: (fieldConfig: GraphQLFieldConfig<undefined, MyContext>) => {
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          if (context.userID === "") {
            throw new GraphQLError("AUTHENTICATION", {
              extensions: { code: "AUTHENTICATION", http: { status: 404 } },
            });
          }
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
}

const subgraphSchema = buildSubgraphSchema({ typeDefs, resolvers });

const schema = authDirectiveTransformer(subgraphSchema, "auth");

const server = new ApolloServer<MyContext>({ schema });

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
