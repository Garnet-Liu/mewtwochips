import { NextResponse } from "next/server";

import { pokemonClient } from "@/services/pokemon.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset")) || 0;
  console.log('offset', offset);
  const limit = Number(searchParams.get("limit")) || 20;
  console.log('limit', limit);
  try {
    const pokemon = await pokemonClient.listPokemons(offset, limit);
    return NextResponse.json(pokemon);
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
