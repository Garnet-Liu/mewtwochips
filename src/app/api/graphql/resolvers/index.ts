import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

import { VillageQuery } from "@/gql/graphql";
import { IContextValue } from "@/app/api/graphql/route";

export const resolvers: IExecutableSchemaDefinition<IContextValue>["resolvers"] = {
  VillageQuery: {
    __resolveType(obj: VillageQuery) {
      if ("reason" in obj) {
        return "ClientError";
      } else if ("tag" in obj) {
        return "Village";
      } else {
        return null; // GraphQLError is thrown
      }
    },
  },
  Query: {
    village: (_, { tag }, { coc }) => coc.getPlayer(tag),
    currentUser: (_, __, { firebase, user }) => firebase.getCurrentUser(user),
  },
  Mutation: {
    addVillage: (_, { tag }, { firebase, coc, user }) => firebase.addVillage(coc, tag, user),
  },
};
