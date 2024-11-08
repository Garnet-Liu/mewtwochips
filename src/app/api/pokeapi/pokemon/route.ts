import { NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { NextRequest, NextResponse } from "next/server";

import { baseFetchRequest } from "@/lib/fetch-request";
import { requestSpecies } from "@/app/api/pokeapi/pokemon/servers/request-genus";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 20;
  console.log(`request pokemon list offset:${offset} limit:${limit}`);
  try {
    let totalCount = 0;
    return baseFetchRequest<NamedAPIResourceList>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    )
      .then(async ({ results, count }) => {
        totalCount = count;
        const res = await Promise.allSettled(
          results.map((pokemon) => baseFetchRequest<Pokemon>(pokemon.url)),
        );
        return res.map((r) => (r.status === "fulfilled" ? r.value : null));
      })
      .then(async (pokemon) => {
        const res = await Promise.allSettled(
          pokemon.map(async (p) => {
            if (p) {
              const species = await requestSpecies(p.species.url);
              return {
                id: p.id,
                name: p.name,
                show: false,
                pokemon_photo: p.sprites.other?.["official-artwork"].front_default || "",
                ...species,
              };
            } else {
              return null;
            }
          }),
        );
        return res.map((p) => (p.status === "fulfilled" ? p.value : null));
      })
      .then((pokemon) => {
        return NextResponse.json({
          data: { pokemon: pokemon, count: totalCount },
          message: "success",
          success: true,
          code: 200,
        });
      });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
