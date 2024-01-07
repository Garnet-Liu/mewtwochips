import { auth } from "@/context/nextAuth";
import { TCurrentUser } from "@/gql/graphql";
import { ILanguageParams } from "@/types/globals";
import { getClient } from "@/context/apolloServer";
import { Clans, Events, QueryCurrentUser, Villages } from "@/app/[lng]/libs";

interface Props extends ILanguageParams {}

export default async function Page(props: Props) {
  const { params } = props;

  const user = await requestCurrentUser();

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4">
      <Events lng={params.lng} />

      <Villages lng={params.lng} user={user as TCurrentUser} />

      <Clans lng={params.lng} user={user as TCurrentUser} />
    </main>
  );
}

const requestCurrentUser = async () => {
  const session = await auth();
  if (session) {
    try {
      return (await getClient().query({ query: QueryCurrentUser, context: {} })).data.currentUser;
    } catch (e) {
      console.log("\x1b[31m", "getClient query error", (e as any).message);
    }
  } else {
    console.log("\x1b[31m", "not user session");
  }
  return undefined;
};
