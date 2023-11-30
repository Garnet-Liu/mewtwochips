"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";

import { IProfile } from "@/interfaces/profile.interface";
import { IClanDetail } from "@/interfaces/clash-of-clans.interface";
import { clientFetchRequest } from "@/services/fetch-request.service";
import autumnQueen from "@/public/images/clash-of-clans/autumn-queen.png";
import ClanTable from "@/app/clash-of-clans/componsnts/clan-features/add-clan/clan-tabel/clan-table";

export default function AddClan({ profile }: { profile: IProfile }) {
  const [clanList, setClanList] = useState<IClanDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("tag", data.get("tag"));
    setLoading(true);
    try {
      const searchClan = await clientFetchRequest<IClanDetail[]>(
        `/api/clash-of-clans/search-clan`,
        { method: "post", body: JSON.stringify({ search: data.get("tag") }) }
      );
      console.log("searchClan", searchClan);
      setClanList(searchClan.data);
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex p-5">
        <Image src={autumnQueen} width="294" height="422" alt="queen"/>

        <div className="flex-1 flex flex-col justify-center py-3 px-6">
          <div className="p-10">
            <h1 className="text-5xl font-semibold">你好！首领！</h1>
            <p className="text-xl font-normal">
              欢迎来到这里。这里可以管理你的成员部落详细情况和查看你部落战的历史详情。也可以在联赛期间查看联赛的具体战斗情况。但是首先我们从找到你的部落开始！
            </p>
          </div>

          {/*<Box component="form" className="p-2" onSubmit={handleSubmit}>*/}
          {/*  <TextField fullWidth*/}
          {/*             name="tag"*/}
          {/*             placeholder="输入部落tag或者部落名称检索部落: #000000000 或者 部落名字"*/}
          {/*             InputProps={{*/}
          {/*               endAdornment: loading ? (*/}
          {/*                 <InputAdornment position="end">*/}
          {/*                   <CircularProgress size={30}/>*/}
          {/*                 </InputAdornment>*/}
          {/*               ) : null*/}
          {/*             }}/>*/}
          {/*</Box>*/}
        </div>
      </div>

      {!!clanList.length && (
        <div className="p-3 rounded-lg bg-slate-300">
          <ClanTable clanList={clanList} profile={profile}/>
        </div>
      )}
    </>
  );
}
