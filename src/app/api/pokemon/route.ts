import { NextResponse } from "next/server";

import { loadTable } from "@/app/api/pokemon/functions/load-table";

export async function GET() {
  console.log("========================== troop-donated ==========================");

  try {
    const playerBase = await loadTable();

    console.log(`length: ${playerBase.length}`);
    return NextResponse.json({ success: true, data: playerBase });
  } catch (e) {
    console.error("troop-donated get error", e);
    return NextResponse.json({ success: true, data: [] });
  }
}
