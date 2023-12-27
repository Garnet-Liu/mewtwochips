import useSWR from "swr";

import { apiFetchRequest } from "@/context/apiFetchRequest";
import { IPokemonList } from "@/app/[lng]/features/pokemon/types/pokemon.interface";

export const usePokemonList = (offset: number, limit: number) => {
  return useSWR<IPokemonList>(
    `/api/features/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    apiFetchRequest,
  );
};
