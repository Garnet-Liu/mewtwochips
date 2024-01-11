import { headers } from "next/headers";

import { CurrentUser } from "@/gql/graphql";
import { ILanguageParams } from "@/types/globals";
import { getClient } from "@/context/apollo/server";
import { Clans, Events, QueryCurrentUser, Villages } from "@/app/[lng]/libs";

interface Props extends ILanguageParams {}

export default async function Page(props: Props) {
  const { params } = props;

  const user = await requestCurrentUser();

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4">
      <Events lng={params.lng} />

      <Villages lng={params.lng} user={user as CurrentUser} />

      <Clans lng={params.lng} user={user as CurrentUser} />
    </main>
  );
}

const requestCurrentUser = async () => {
  try {
    return (
      await getClient().query({
        query: QueryCurrentUser,
        context: { fetchOptions: { header: headers() } },
      })
    ).data.currentUser;
  } catch (e) {
    console.log("getClient query error", (e as any).message);
  }
  return undefined;
};
