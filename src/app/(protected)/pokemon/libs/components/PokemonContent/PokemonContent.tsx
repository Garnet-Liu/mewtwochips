"use client";

import { MouseEvent, use, useCallback, useState } from "react";

import { PokemonList, PokemonPagination } from "@/app/(protected)/pokemon/libs/components";

const ROWS_PAGE = 15;

interface IProps {
  commentsPromise: Promise<{ count: number }>;
}

export function PokemonContent(props: IProps) {
  const { commentsPromise } = props;

  const [page, setPage] = useState<number>(0);

  const { count } = use(commentsPromise);

  const handleChangePage = useCallback((_: MouseEvent<HTMLAnchorElement>, newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <>
      <PokemonList page={page} rowsPage={ROWS_PAGE} />

      <PokemonPagination
        page={page}
        count={count}
        rowsPage={ROWS_PAGE}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
