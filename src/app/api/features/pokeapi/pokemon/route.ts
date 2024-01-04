import { NamedAPIResourceList, Pokemon, PokemonSpecies } from "pokenode-ts";
import { NextResponse } from "next/server";

import { IBaseResponse } from "@/types/apiResponse";
import { IPokemon, IPokemonList } from "@/app/[lng]/features/pokemon/types/pokemon.interface";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 20;
  console.log(`request pokemon list offset:${offset} limit:${limit}`);
  try {
    const pokemonListResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );
    const pokemonList: NamedAPIResourceList = await pokemonListResponse.json();
    const fetchPokemonGroup: Array<Promise<Pokemon>> = pokemonList.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      return pokemonResponse.json();
    });
    const pokemonData = await Promise.all(fetchPokemonGroup);
    const fetchSpeciesResponseGroup: Array<Promise<PokemonSpecies>> = pokemonData.map(
      async (response) => {
        const speciesResponse = await fetch(response.species.url);
        return speciesResponse.json();
      },
    );
    const speciesData = await Promise.all(fetchSpeciesResponseGroup);
    const responsePokemon: IPokemon[] = pokemonData.map((pokemon, index) => {
      const species = speciesData[index];
      const zh_Name = species.names.find((item) => item.language.name === "zh-Hans");
      return {
        id: pokemon.id,
        name: pokemon.name,
        show: false,
        pokemon_photo: pokemon.sprites.other?.["official-artwork"].front_default || "",
        pokemon_color: species.color.name,
        pokemon_name: zh_Name?.name ?? species.name,
      };
    });

    const apiResponseData: IBaseResponse<IPokemonList> = {
      data: { pokemon: responsePokemon, count: pokemonList.count },
      message: "success",
      success: true,
      code: 200,
    };
    return NextResponse.json(apiResponseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
