import { NextResponse } from "next/server";

import { sleep } from "@/common/sleep";
import { loadDonations, loadTable, PlayerBase } from "./crawler-function/load-table";

interface Player extends PlayerBase {
  donation: number;
}

export async function GET() {
  console.log("========================== troop-donated ==========================");
  const players: Player[] = [];

  try {
    const playerBase = await loadTable();

    await sleep(1000);

    console.log(`length: ${playerBase.length}`);

    for (let i = 0; i < playerBase.length; i++) {
      const player = playerBase[i].name;
      const tag = playerBase[i].tag;
      console.log(`start load ${i + 1} => ${player}`);
      const playerDonation = await loadDonations(tag);
      players.push({ ...playerBase[i], donation: playerDonation });
    }

    players.sort((a, b) => b.donation - a.donation);

    const result = players.reduce((result, current, index) => {
      return result + `${index + 1}. ${current.name}(#${current.tag}): ${current.donation}\n`;
    }, "");

    console.log(result);
  } catch (e) {
    console.error("troop-donated get error", e);
  }

  return NextResponse.json({ success: true, data: players });
}
