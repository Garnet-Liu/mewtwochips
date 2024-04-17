import { NextResponse } from "next/server";

import { armyList } from "@/app/api/coc/web-crawler/crawler-function/army/armyList";
import { trapsList } from "@/app/api/coc/web-crawler/crawler-function/traps/trapsList";
import { resourceList } from "@/app/api/coc/web-crawler/crawler-function/resource/resourceList";
import { defensiveList } from "@/app/api/coc/web-crawler/crawler-function/defensive/defensiveList";
import { elixirTroopsList } from "@/app/api/coc/web-crawler/crawler-function/elixir-troops/elixirTroopsList";

export async function GET() {
  const baseUrl = "https://clashofclans.fandom.com";

  const army = await armyList(baseUrl);
  const traps = await trapsList(baseUrl);
  const resource = await resourceList(baseUrl);
  const defensive = await defensiveList(baseUrl);
  const elixirTroops = await elixirTroopsList(baseUrl);

  return NextResponse.json({ success: true, data: { elixirTroops } });
}
