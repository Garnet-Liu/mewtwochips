import { GraphQLError } from "graphql/error";

import { VillageQuery } from "@/gql/graphql";
import { IContextValue } from "@/app/api/graphql/route";

export const queryVillage = async (
  _: any,
  { tag }: { tag: string },
  { coc }: IContextValue,
): Promise<VillageQuery> => {
  console.log("============ tag => ", tag);
  if (!tag) {
    throw new GraphQLError("not tag", {
      extensions: {
        code: "NOT_PLAYER_TAG",
      },
    });
  }

  const res = await coc.getPlayer(tag).catch((error) => {
    console.log("error", error);
    return error;
  });
  console.log(res);
  return res;
};
