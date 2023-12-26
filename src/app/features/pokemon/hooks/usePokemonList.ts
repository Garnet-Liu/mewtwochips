import useSWR from "swr";

import { fetchRequest } from "@/context/fetch-request";
import { IPokemonList } from "@/app/features/pokemon/types/pokemon.interface";

export const usePokemonList = (offset: number, limit: number) => {
  return useSWR<IPokemonList>(
    `/api/features/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    fetchRequest,
  );
};
