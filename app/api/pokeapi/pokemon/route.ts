import { NextResponse } from "next/server";
import { pokemonClient } from "@/services/pokemon.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 20;
  const pokemon = await pokemonClient.listPokemons(offset, limit);
  return NextResponse.json(pokemon);
}
