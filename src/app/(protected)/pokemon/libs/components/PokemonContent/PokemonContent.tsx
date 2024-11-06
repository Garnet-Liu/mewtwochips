"use client";

import { MouseEvent, useEffect, useState } from "react";

import { baseFetchRequest } from "@/lib/fetch-request";
import { PokemonList, PokemonPagination } from "@/app/(protected)/pokemon/libs/components";

export function PokemonContent() {
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const rowsPage = 15;

  useEffect(() => {
    baseFetchRequest<{ count: number }>("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1")
      .then((data) => {
        setCount(data.count);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  }, []);

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <PokemonList page={page} rowsPage={rowsPage} />

      <PokemonPagination
        page={page}
        count={count}
        rowsPage={rowsPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
