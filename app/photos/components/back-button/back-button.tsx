"use client";

import { ReactNode, useEffect } from "react";

import requestService from "@/services/request.service";
import { IPokemonResponse } from "@/interfaces/pokemon.interface";

export default function BackButton({ children }: { children?: ReactNode }) {
  useEffect(() => {
    requestService.get<void, IPokemonResponse>(`/api/pokeapi/pokemon/charizard`).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>test</div>
  );
}
