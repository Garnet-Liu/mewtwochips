import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { typeDefs } from "@/app/api/graphql/schemas";
import { resolvers } from "@/app/api/graphql/resolvers";
import { COSDataSource } from "@/app/api/graphql/dataLoaders/cocLoader";
import { FirebaseDataSource } from "@/app/api/graphql/dataLoaders/firestoreLoader";

export interface IContextValue {
  coc: COSDataSource;
  firebase: FirebaseDataSource;
}

const server = new ApolloServer<IContextValue>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, IContextValue>(server, {
  context: async (req) => {
    const { cache } = server;
    return {
      coc: new COSDataSource({ cache }),
      firebase: new FirebaseDataSource({ cache }),
    };
  },
});

export { handler as GET, handler as POST };
