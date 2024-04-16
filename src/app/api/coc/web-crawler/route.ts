import { NextResponse } from "next/server";

import { defenseList } from "@/app/api/coc/web-crawler/crawler-function/defenses/defense-list";

export async function GET() {
  const defense = await defenseList();

  return NextResponse.json({ success: true, data: defense });
}
