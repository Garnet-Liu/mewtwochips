import { headers } from "next/headers";

import { IProfile } from "@/interfaces/profile.interface";
import PageHeader from "@/app/components/page-header/page-header";
import { clientFetchRequest } from "@/services/fetch-request.service";
import ClanFeatures from "@/app/clash-of-clans/componsnts/clan-features/clan-features";
import RepeatingEvent from "@/app/clash-of-clans/componsnts/repeating-event/repeating-event";

export default async function ClashOfClans() {
  const profileResponse = await clientFetchRequest<IProfile>("/api/clash-of-clans/profile", { headers: headers() });
  console.log("profile", profileResponse);
  return (
    <div className="w-[1200px] mx-auto bg-white mt-5 overflow-hidden">
      {/* @ts-expect-error Server Component */}
      <PageHeader pageTitle="Clash of Clans" backRoute="/"/>
      <RepeatingEvent/>
      {/* @ts-expect-error Server Component */}
      <ClanFeatures profile={profileResponse.data}/>
    </div>
  );
}
