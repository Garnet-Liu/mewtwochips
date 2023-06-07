import { NextResponse } from "next/server";

import { pokemonClient } from "@/services/pokemon.service";

export async function GET(request: Request, { params }: { params: { name: number } }) {
  const species = await pokemonClient.getPokemonSpeciesById(params.name);
  const pokemon = await pokemonClient.getPokemonById(params.name);
  return NextResponse.json({ species, pokemon });
}
