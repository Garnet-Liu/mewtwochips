"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent } from "react";

import { Button } from "@/components/ui/button";

interface IProps {
  page: number;
  count?: number;
  rowsPage: number;

  handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number): void;
}

export function PokemonPagination(props: Readonly<IProps>) {
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
      <Button size="icon" onClick={handleBefore} disabled={page <= 0}>
        <ChevronLeft size={16} />
      </Button>

      <Button size="icon" onClick={handleAfter} disabled={page >= maxPage}>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
