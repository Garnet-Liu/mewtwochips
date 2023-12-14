import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("request clash of clans tag");
  const res = await request.json();
  console.log("res", res);
  if (res.hasOwnProperty("tag")) {

    const clansResponse = await fetch(`https://api.clashofclans.com/v1/clans/%23${res.tag}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const clans = await clansResponse.json();

    const clansMembersResponse = await fetch(`https://api.clashofclans.com/v1/clans/%23${res.tag}/members`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const clansMembers = await clansMembersResponse.json();

    const warLogResponse = await fetch(`https://api.clashofclans.com/v1/clans/%23${res.tag}/warlog`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const warLog = await warLogResponse.json();

    const currentWarResponse = await fetch(`https://api.clashofclans.com/v1/clans/%23${res.tag}/currentwar`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const currentWar = await currentWarResponse.json();

    const clanWarLeaguesResponse = await fetch(`https://api.clashofclans.com/v1/clanwarleagues/wars/${res.tag}?limit=60`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const clanWarLeagues = await clanWarLeaguesResponse.json();

    const leagueGroupResponse = await fetch(`https://api.clashofclans.com/v1/clans/${res.tag}/currentwar/leaguegroup`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLASH_API_KEY}` }
    });
    const leagueGroup = await leagueGroupResponse.json();

    return NextResponse.json({ clans, clansMembers, warLog, currentWar, clanWarLeagues, leagueGroup });

  } else {

    return NextResponse.json("没有tag", { status: 404 });
  }
}
