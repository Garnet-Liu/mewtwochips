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
  },
  Mutation: {
    addVillage: (_, { tag }, { firebase }) => firebase.getCurrentUser("KRxXb7cFRy6b4csV6oAa"),
  },
};
