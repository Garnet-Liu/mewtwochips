import useSWR from "swr";

import { IBaseResponse } from "@/interfaces/api.interface";
import { IPokemonList } from "@/interfaces/pokemon.interface";
import { clientFetchRequest } from "@/services/fetch-request.service";

export const useApiPokemonList = (offset: number, limit: number = 10) => {
  return useSWR<IBaseResponse<IPokemonList>>(
    `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    clientFetchRequest
  );
};

