import { NextResponse } from "next/server";

import { env } from "../../../../../env.mjs";

import { IBaseResponse } from "@/types/api.interface";
import { tagPattern1, tagPattern2 } from "@/context/pattern.tool";
import { IClanDetail } from "@/types/clashOfClans";
import { fetchRequest } from "@/context/fetch-request";

export async function POST(request: Request): Promise<NextResponse<IBaseResponse<IClanDetail[]>>> {
  console.log("request clash of clans search");
  const { search } = await request.json();
  console.log("search", search);
  if (search && search.length >= 3) {
    if (tagPattern1.test(search)) {
      const clan = await fetchRequest<IClanDetail>(
        `https://api.clashofclans.com/v1/clans/${encodeURIComponent(search)}`,
        { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
      );
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: [clan],
      });
    } else if (tagPattern2.test(search)) {
      const clan = await fetchRequest<IClanDetail>(
        `https://api.clashofclans.com/v1/clans/%23${search}`,
        { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
      );
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: [clan],
      });
    } else {
      const clans = await fetchRequest<{ items: [{ tag: string }] }>(
        `https://api.clashofclans.com/v1/clans?name=${search}`,
        { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
      );
      const clanListGroup = (clans?.items || []).map(async ({ tag }) => {
        return await fetchRequest<IClanDetail>(
          `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`,
          { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
        );
      });
      const clanList = await Promise.all(clanListGroup);
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: clanList,
      });
    }
  } else {
    return NextResponse.json(
      { code: 400, success: false, message: "没有检索条件", data: [] },
      { status: 404 },
    );
  }
}
