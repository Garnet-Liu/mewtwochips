import { useEffect, useMemo, useState } from "react";

import { IPokemonList } from "@/app/(protected)/pokemon/libs/types";
import { baseFetchRequest, IBaseResponse } from "@/lib/fetch-request";

export const usePokemonList = (offset: number, limit: number) => {
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<IPokemonList | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    baseFetchRequest<IBaseResponse<IPokemonList>>(
      `/api/pokeapi/pokemon?offset=${offset * limit}&limit=${limit}`,
    )
      .then((data) => {
        setPokemonList(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, offset]);

  return useMemo(() => {
    return {
      error: null,
      data: pokemonList,
      isLoading: loading,
    };
  }, [loading, pokemonList]);
};
