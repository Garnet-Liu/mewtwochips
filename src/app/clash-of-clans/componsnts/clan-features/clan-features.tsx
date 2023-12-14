import { headers } from "next/headers";

import { IProfile } from "@/interfaces/profile.interface";
import { IClanDetail } from "@/interfaces/clash-of-clans.interface";
import { clientFetchRequest } from "@/services/fetch-request.service";
import AddClan from "@/app/clash-of-clans/componsnts/clan-features/add-clan/add-clan";
import ClanTable from "@/app/clash-of-clans/componsnts/clan-features/add-clan/clan-tabel/clan-table";

interface IClanFeaturesProps {
  profile: IProfile;
}

export default async function ClanFeatures({ profile }: IClanFeaturesProps) {
  const clanListResponse = await Promise.all(profile.clans.map(async (clan) => {
    return clientFetchRequest<IClanDetail>("/api/clash-of-clans/clan-detail", {
      method: "post",
      headers: headers(),
      body: JSON.stringify({ tag: clan })
    });
  }));

  const clanList = clanListResponse.map((clan) => clan.data).filter((c) => !!c);

  if (profile.clans.length) {
    return (
      <div className="m-5 p-3 rounded-lg bg-slate-300">
        <ClanTable clanList={clanList} profile={profile}/>
      </div>
    );
  } else {
    return <AddClan profile={profile}/>;
  }
}
