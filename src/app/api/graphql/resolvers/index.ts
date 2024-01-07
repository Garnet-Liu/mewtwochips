import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

import { VillageQuery } from "@/gql/graphql";
import { IContextValue } from "@/app/api/graphql/route";

export const resolvers: IExecutableSchemaDefinition<IContextValue>["resolvers"] = {
  VillageQuery: {
    __resolveType(obj: VillageQuery) {
      if ("reason" in obj) {
        return "TClientError";
      } else if ("tag" in obj) {
        return "TVillage";
      } else {
        return null; // GraphQLError is thrown
      }
    },
  },
  Query: {
    village: (_, { tag }, { coc }) => coc.getPlayer(tag),
    currentUser: (_, __, { firebase, session }) => firebase.getCurrentUser(session),
  },
  Mutation: {
    addVillage: (_, { tag }, { firebase, session }) => firebase.getCurrentUser(session),
  },
};
