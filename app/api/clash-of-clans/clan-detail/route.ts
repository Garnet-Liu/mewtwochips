import { NextResponse } from "next/server";

import { IBaseResponse } from "@/interfaces/api.interface";
import { verifyTokenTool } from "@/tools/verify-token.tool";
import { serverFetchRequest } from "@/services/fetch-request.service";
import { IClanDetail, IClanError } from "@/interfaces/clash-of-clans.interface";

export async function POST(request: Request) {
  console.log("request clash of clans POST: /clan-detail");
  const { tag } = await request.json();
  console.log("tag", tag);

  return verifyTokenTool<IBaseResponse<IClanDetail | null>>(() => {
    return serverFetchRequest<IClanDetail | IClanError>(
      `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`,
      { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` } }
    ).then((clan) => {
      if (clan.hasOwnProperty("reason")) {
        switch ((clan as IClanError).reason) {
          case "accessDenied.invalidIp":
            return NextResponse.json({ code: 200, success: false, message: (clan as IClanError).message, data: null });
          default:
            return NextResponse.json({ code: 200, success: false, message: "not error", data: null });
        }
      } else {
        return NextResponse.json({ code: 200, success: true, message: "success", data: clan as IClanDetail });
      }
    });
  });
}
