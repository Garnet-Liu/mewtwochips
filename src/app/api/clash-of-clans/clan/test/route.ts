import { NextResponse } from "next/server";

import { baseFetchRequest } from "@/context/fetch-request";
import { IClanDetail, IClanError } from "@/interfaces/clashOfClans.interface";
import { env } from "../../../../../../env.mjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  console.log("====== tag test ======");
  const dateResponse = await baseFetchRequest("https://worldtimeapi.org/api/ip");
  console.log("dateResponse", dateResponse);
  const clan = await baseFetchRequest<IClanDetail | IClanError>(
    `https://api.clashofclans.com/v1/clans/${encodeURIComponent(`#${tag}`)}`,
    { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
  );
  console.log("clan", clan);
  return NextResponse.json({
    code: 200,
    success: true,
    message: "success",
    data: clan,
  });
}
