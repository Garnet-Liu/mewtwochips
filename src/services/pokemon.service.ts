import useSWR from "swr";

import { IBaseResponse } from "@/interfaces/api.interface";
import { IPokemonList } from "@/interfaces/pokemon.interface";
import { fetchRequest } from "@/context/fetch-request";

export const useApiPokemonList = (offset: number, limit: number) => {
  return useSWR<IBaseResponse<IPokemonList>>(
    `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    fetchRequest,
  );
};
