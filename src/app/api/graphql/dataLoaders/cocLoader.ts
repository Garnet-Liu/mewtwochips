import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql/error";
import { User } from "firebase/auth";

import { env } from "../../../../../env.mjs";
import { ClientError, Maybe, VillageQuery } from "@/gql/graphql";

export class COSDataSource extends RESTDataSource {
  override baseURL = "https://api.clashofclans.com";

  async getPlayer(tag: string): Promise<VillageQuery> {
    console.log("getPlayer tag", tag);
    return this.get<VillageQuery>(`/v1/players/${encodeURIComponent(tag)}`, {
      headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` },
    }).catch((error) => {
      return (
        (error as GraphQLError).extensions?.response as {
          body: ClientError;
        }
      ).body;
    });
  }

  async getVillageBuildList(user: Maybe<User>) {}
}
