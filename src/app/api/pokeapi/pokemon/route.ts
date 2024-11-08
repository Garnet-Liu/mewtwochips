import { NamedAPIResourceList, Pokemon } from "pokenode-ts";
import { NextResponse } from "next/server";

import { auth } from "@/next-auth/auth";
import { verifyIdToken } from "@/lib/verify-id-token";
import { baseFetchRequest } from "@/lib/fetch-request";
import { requestSpecies } from "@/app/api/pokeapi/pokemon/servers/request-genus";

export const GET = auth(async (req) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 20;

  console.log(`request pokemon list offset:${offset} limit:${limit}`);

  return await verifyIdToken(req.auth, async () => {
    const { results, count } = await baseFetchRequest<NamedAPIResourceList>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );
    const pokemon = await Promise.allSettled(
      results.map((pokemon) => baseFetchRequest<Pokemon>(pokemon.url)),
    )
      .then((pokemon) => {
        return pokemon.map((p) => {
          return p.status === "fulfilled" ? p.value : null;
        });
      })
      .then((pokemon) => {
        return Promise.allSettled(
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
      })
      .then((pokemon) => {
        return pokemon.map((p) => {
          return p.status === "fulfilled" ? p.value : null;
        });
      });
    return NextResponse.json({
      data: { pokemon, count },
      message: "success",
      success: true,
      code: 200,
    });
  });
});
