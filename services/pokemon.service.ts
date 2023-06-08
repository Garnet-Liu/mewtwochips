import useSWR from "swr";

import { IPokemonList } from "@/interfaces/pokemon.interface";

export const useApiPokemonList = (offset: number, limit: number = 10) => {
  return useSWR<IPokemonList>(
    `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    fetchRequest
  );
};

export const fetchRequest = (url: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`).then((res) => res.json());
};
