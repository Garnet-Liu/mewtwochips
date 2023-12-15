import { headers } from "next/headers";

import { IProfile } from "@/interfaces/profile.interface";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { clientFetchRequest } from "@/services/fetch-request.service";
import ClanFeatures from "@/app/clash-of-clans/componsnts/clan-features/clan-features";
import { RepeatingEvent } from "./componsnts/RepeatingEvent/RepeatingEvent";
import { Clans } from "./Clans/Clans";
import { Players } from "./Players/Players";

export default async function Page() {
  // const profileResponse = await clientFetchRequest<IProfile>("/api/clash-of-clans/profile", { headers: headers() });
  // console.log("profile", profileResponse);
  return (
    <>
      <PageHeader pageTitle="Clash of Clans" backRoute="/" />

      <RepeatingEvent />

      <Clans />

      <Players />
    </>
  );
}
