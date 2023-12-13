import { NextResponse } from "next/server";

import { IBaseResponse } from "@/interfaces/api.interface";
import { tagPattern1, tagPattern2 } from "@/context/pattern.tool";
import { IClanDetail } from "@/interfaces/clash-of-clans.interface";
import { serverFetchRequest } from "@/services/fetch-request.service";

export async function POST(request: Request): Promise<NextResponse<IBaseResponse<IClanDetail[]>>> {
  console.log("request clash of clans search");
  const { search } = await request.json();
  console.log("search", search);
  if (search && search.length >= 3) {
    if (tagPattern1.test(search)) {
      const clan = await serverFetchRequest<IClanDetail>(
        `https://api.clashofclans.com/v1/clans/${encodeURIComponent(search)}`,
        { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` } }
      );
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: [clan]
      });
    } else if (tagPattern2.test(search)) {
      const clan = await serverFetchRequest<IClanDetail>(
        `https://api.clashofclans.com/v1/clans/%23${search}`,
        { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` } }
      );
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: [clan]
      });
    } else {
      const clans = await serverFetchRequest<{ items: [{ tag: string }] }>(
        `https://api.clashofclans.com/v1/clans?name=${search}`,
        { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` } }
      );
      const clanListGroup = (clans?.items || []).map(async ({ tag }) => {
        return await serverFetchRequest<IClanDetail>(
          `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`,
          { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` } }
        );
      });
      const clanList = await Promise.all(clanListGroup);
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: clanList
      });
    }
  } else {
    return NextResponse.json({ code: 400, success: false, message: "没有检索条件", data: [] }, { status: 404 });
  }
}
