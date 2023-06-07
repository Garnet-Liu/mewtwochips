"use client";

import { ReactNode, useEffect } from "react";
import requestService from "@/services/request.service";
import { Pokemon, PokemonSpecies } from "pokenode-ts";

interface IPokemonResponse {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

export default function BackButton({ children }: { children?: ReactNode }) {
  useEffect(() => {
    requestService.get<void, IPokemonResponse>(
      `/api/pokeapi/pokemon/1`
    ).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>test</div>
  );
}
