import { NextResponse } from "next/server";

import { env } from "../../../../../env.mjs";

export async function POST(request: Request) {
  console.log("request clash of clans player tag");
  const res = await request.json();
  console.log("res", res);
  if (res.hasOwnProperty("tag")) {
    const playerResponse = await fetch(`https://api.clashofclans.com/v1/players/%23${res.tag}`, {
      headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` },
    });
    const player = await playerResponse.json();

    return NextResponse.json(player);
  } else {
    return NextResponse.json("没有tag", { status: 404 });
  }
}
