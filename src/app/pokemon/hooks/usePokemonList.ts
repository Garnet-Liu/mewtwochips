import useSWR from "swr";

import { fetchRequest } from "@/context/fetch-request";
import { IPokemonList } from "@/interfaces/pokemon.interface";

export const usePokemonList = (offset: number, limit: number) => {
  return useSWR<IPokemonList>(
    `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    fetchRequest,
  );
};
