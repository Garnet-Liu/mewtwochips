import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { User } from "firebase/auth";

import { Maybe } from "@/gql/graphql";
import { typeDefs } from "@/app/api/graphql/schemas";
import { resolvers } from "@/app/api/graphql/resolvers";
import { getCurrentUser } from "@/context/firebase/server";
import { COSDataSource } from "@/app/api/graphql/dataLoaders/cocLoader";
import { FirebaseDataSource } from "@/app/api/graphql/dataLoaders/firestoreLoader";

export interface IContextValue {
  user: Maybe<User>;
  coc: COSDataSource;
  firebase: FirebaseDataSource;
}

const server = new ApolloServer<IContextValue>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, IContextValue>(server, {
  context: async () => {
    const { cache } = server;
    const { currentUser } = await getCurrentUser();
    return {
      user: currentUser,
      coc: new COSDataSource({ cache }),
      firebase: new FirebaseDataSource({ cache }),
    };
  },
});

export { handler as GET, handler as POST };
