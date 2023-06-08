"use client";

import { TablePagination } from "@mui/material";
import { MouseEvent } from "react";

interface IPokemonPaginationProps {
  page: number;
  count?: number;
  rowsPage?: number;

  handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number): void;
}

export default function PokemonPagination(props: IPokemonPaginationProps) {
  const { count = 1281, page, rowsPage = 10, handleChangePage } = props;
  return (
    <TablePagination component="div" count={count} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPage}/>
  );
}
