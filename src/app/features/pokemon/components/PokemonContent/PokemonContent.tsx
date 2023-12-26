"use client";

import { MouseEvent, useEffect, useState } from "react";

import { PokemonList } from "@/app/features/pokemon/components/pokemon-list/pokemon-list";
import { PokemonPagination } from "@/app/features/pokemon/components/PokemonPagination/PokemonPagination";

export function PokemonContent() {
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const rowsPage = 15;

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1")
      .then((response) => {
        return response.json();
      })
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
