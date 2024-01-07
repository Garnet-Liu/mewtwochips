import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { Session } from "next-auth";

import { auth } from "@/context/nextAuth";
import { typeDefs } from "@/app/api/graphql/schemas";
import { resolvers } from "@/app/api/graphql/resolvers";
import { COSDataSource } from "@/app/api/graphql/dataLoaders/cocLoader";
import { FirebaseDataSource } from "@/app/api/graphql/dataLoaders/firestoreLoader";
import { Maybe } from "@/gql/graphql";

export interface IContextValue {
  coc: COSDataSource;
  session: Maybe<Session>;
  firebase: FirebaseDataSource;
}

const server = new ApolloServer<IContextValue>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, IContextValue>(server, {
  context: async (req) => {
    const session = await auth();
    console.log("session", session);
    const { cache } = server;
    return {
      session: session,
      coc: new COSDataSource({ cache }),
      firebase: new FirebaseDataSource({ cache }),
    };
  },
});

export { handler as GET, handler as POST };
