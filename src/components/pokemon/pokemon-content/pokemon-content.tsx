"use client";

import { NetworkStatus, QueryRef, useQueryRefHandlers, useReadQuery } from "@apollo/client";
import { MouseEvent, useCallback } from "react";

import { QAllPokemonQuery } from "@/apollo/gql/graphql";
import { PokemonList } from "@/components/pokemon/pokemon-list";
import { PokemonPagination } from "@/components/pokemon/pokemon-pagination";

const ROWS_PAGE = 15;

interface IProps {
  queryRef: QueryRef<QAllPokemonQuery>;
  countPromise: Promise<{ count: number }>;
}

export function PokemonContent(props: IProps) {
  const { countPromise, queryRef } = props;

  const { refetch } = useQueryRefHandlers(queryRef);
  const { data, networkStatus } = useReadQuery(queryRef);

  const handleChangePage = useCallback(
    (_: MouseEvent<HTMLAnchorElement>, page: number) => {
      refetch({ offset: page * ROWS_PAGE }).then((pokemon) => {
        console.log("handleChangePage refetch pokemon", pokemon);
      });
    },
    [refetch],
  );

  return (
    <>
      <PokemonList
        pokemon={data.pokemonAll?.results}
        isLoading={networkStatus === NetworkStatus.loading}
      />

      <PokemonPagination
        page={(data.pokemonAll?.offset ?? 0) / ROWS_PAGE}
        rowsPage={ROWS_PAGE}
        countPromise={countPromise}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
