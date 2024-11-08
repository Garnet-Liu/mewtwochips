import { Pokemon, PokemonSpecies, Stat } from "pokenode-ts";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { firebaseAdmin } from "@/firebase/firebase-admin";
import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";

export const GET = auth(async (req, ctx) => {
  const params = await ctx.params;
  const name = params?.name;
  console.log("request pokemon name =====>", name);
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(req.auth?.user.idToken ?? "");

    console.log("user =>", user.name);
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon: Pokemon = await pokemonResponse.json();
    const fetchStatGroup: Array<Promise<Stat>> = pokemon.stats.map(async (stat) => {
      const stateResponse = await fetch(stat.stat.url);
      return stateResponse.json();
    });
    const statData = await Promise.all(fetchStatGroup);
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const species: PokemonSpecies = await speciesResponse.json();
    const zh_Name = species.names.find((item) => item.language.name === "zh-Hans");
    const apiResponseData: IPokemonDetail = {
      id: pokemon.id,
      pokemon_color: species.color.name,
      pokemon_name: zh_Name?.name ?? species.name,
      pokemon_photo: pokemon.sprites.other?.["official-artwork"].front_default || "",
      stats: statData.map((stat) => {
        return {
          name: stat.name,
          stat_name: stat.names.find((item) => item.language.name === "zh-Hans")?.name ?? stat.name,
          base_stat: pokemon.stats.find((item) => item.stat.name === stat.name)?.base_stat ?? 0,
        };
      }),
    };
    return NextResponse.json({
      code: 200,
      success: true,
      message: "success",
      data: apiResponseData,
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
