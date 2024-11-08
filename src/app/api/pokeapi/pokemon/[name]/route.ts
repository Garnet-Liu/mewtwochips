import { Pokemon, Stat } from "pokenode-ts";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { baseFetchRequest } from "@/lib/fetch-request";
import { firebaseAdmin } from "@/firebase/firebase-admin";
import { requestName, requestSpecies } from "@/app/api/pokeapi/pokemon/servers/request-genus";

export const GET = auth(async (req, ctx) => {
  const params = await ctx.params;
  const name = params?.name;
  console.log("request pokemon name =====>", name);
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(req.auth?.user.idToken ?? "");

    console.log("===============>", user.name);

    return baseFetchRequest<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(async (p) => {
        const species = await requestSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

        const stats = await Promise.allSettled(
          p.stats.map((stat) => baseFetchRequest<Stat>(stat.stat.url)),
        );
        const statData = stats.map((r) => (r.status === "fulfilled" ? r.value : null));

        return {
          id: p.id,
          ...species,
          pokemon_photo: p.sprites.other?.["official-artwork"].front_default || "",
          stats: statData.map((stat) => {
            const base_stat = p.stats.find((item) => item.stat.name === stat?.name);
            return {
              name: stat?.name,
              stat_name: requestName(stat?.names ?? []) ?? stat?.name,
              base_stat: base_stat?.base_stat ?? 0,
            };
          }),
        };
      })
      .then((pokemon) => {
        return NextResponse.json({
          code: 200,
          success: true,
          message: "success",
          data: pokemon,
        });
      });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        code: 500,
        data: null,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
});
