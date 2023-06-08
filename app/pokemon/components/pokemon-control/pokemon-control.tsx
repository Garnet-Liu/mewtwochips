"use client";

import { MouseEvent, useEffect, useState } from "react";

import PokemonList from "@/app/pokemon/components/pokemon-list/pokemon-list";
import PokemonPagination from "@/app/pokemon/components/pokemon-pagination/pokemon-pagination";

export default function PokemonControl() {
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1").then((response) => {
      return response.json();
    }).then((data) => {
      setCount(data.count);
    });
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <PokemonList page={page}/>

      <PokemonPagination page={page} count={count} handleChangePage={handleChangePage}></PokemonPagination>
    </>
  );
}
