import { useEffect, useMemo, useState, useTransition } from "react";

import { IPokemonList } from "@/app/(protected)/pokemon/libs/types";
import { baseFetchRequest, IBaseResponse } from "@/lib/fetch-request";

export const usePokemonList = (offset: number, limit: number) => {
  const [pokemonList, setPokemonList] = useState<IPokemonList | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await baseFetchRequest<IBaseResponse<IPokemonList>>(
        `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
      );

      setPokemonList(data.data);
    });
  }, [limit, offset]);

  return useMemo(() => {
    return {
      error: null,
      data: pokemonList,
      isLoading: isPending,
    };
  }, [isPending, pokemonList]);
};
