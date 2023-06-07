import { NextResponse } from "next/server";

import { pokemonClient } from "@/services/pokemon.service";

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const stat = await pokemonClient.getStatByName(params.name);
  return NextResponse.json(stat);
}
