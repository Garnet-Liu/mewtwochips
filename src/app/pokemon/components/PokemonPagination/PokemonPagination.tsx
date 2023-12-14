"use client";

import { IconButton } from "@radix-ui/themes";
import { MouseEvent } from "react";

interface IPokemonPaginationProps {
  page: number;
  count?: number;
  rowsPage: number;

  handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number): void;
}

export default function PokemonPagination(props: IPokemonPaginationProps) {
  const { count = 1281, page, rowsPage, handleChangePage } = props;

  const maxPage = Math.ceil(count / rowsPage);

  const handleAfter = (e: MouseEvent<HTMLButtonElement>) => {
    handleChangePage(e, Math.min(maxPage, page + 1));
  };
  const handleBefore = (e: MouseEvent<HTMLButtonElement>) => {
    handleChangePage(e, Math.max(0, page - 1));
  };
  return (
    <div className="mt-4 flex justify-end gap-4">
      <IconButton onClick={handleBefore} disabled={page <= 0}>
        <span className="material-symbols-outlined">navigate_before</span>
      </IconButton>

      <IconButton onClick={handleAfter} disabled={page >= maxPage}>
        <span className="material-symbols-outlined">navigate_next</span>
      </IconButton>
    </div>
  );
}
