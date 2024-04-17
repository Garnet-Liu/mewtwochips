import { NextResponse } from "next/server";

import { trapsList } from "@/app/api/coc/web-crawler/crawler-function/traps/trapsList";
import { defenseList } from "@/app/api/coc/web-crawler/crawler-function/defenses/defenseList";
import { resourceList } from "@/app/api/coc/web-crawler/crawler-function/resource/resourceList";

export async function GET() {
  const baseUrl = "https://clashofclans.fandom.com";

  // const defense = await defenseList(baseUrl);
  // const traps = await trapsList(baseUrl);
  const resource = await resourceList(baseUrl);

  return NextResponse.json({ success: true, data: { resource } });
}
