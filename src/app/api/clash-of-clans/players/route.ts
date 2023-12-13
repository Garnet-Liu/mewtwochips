import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("request clash of clans player tag");
  const res = await request.json();
  console.log("res", res);
  if (res.hasOwnProperty("tag")) {

    const playerResponse = await fetch(`https://api.clashofclans.com/v1/players/%23${res.tag}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const player = await playerResponse.json();

    return NextResponse.json(player);

  } else {

    return NextResponse.json("没有tag", { status: 404 });
  }
}
