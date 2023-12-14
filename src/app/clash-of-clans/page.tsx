import { headers } from "next/headers";

import { IProfile } from "@/interfaces/profile.interface";
import PageHeader from "@/components/PageHeader/PageHeader";
import { clientFetchRequest } from "@/services/fetch-request.service";
import ClanFeatures from "@/app/clash-of-clans/componsnts/clan-features/clan-features";
import RepeatingEvent from "@/app/clash-of-clans/componsnts/repeating-event/repeating-event";

export default async function Page() {
  // const profileResponse = await clientFetchRequest<IProfile>("/api/clash-of-clans/profile", { headers: headers() });
  // console.log("profile", profileResponse);
  return (
    <div className="mx-auto mt-5 w-[1200px] overflow-hidden">
      <PageHeader pageTitle="Clash of Clans" backRoute="/" />
      <RepeatingEvent />
      {/*<ClanFeatures profile={profileResponse.data}/>*/}
    </div>
  );
}
