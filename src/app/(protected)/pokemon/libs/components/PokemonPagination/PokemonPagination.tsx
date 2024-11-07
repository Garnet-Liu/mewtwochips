"use client";

import { MouseEvent, useCallback, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
  page: number;
  count: number;
  rowsPage: number;
  handleChangePage: (event: MouseEvent<HTMLAnchorElement>, newPage: number) => void;
}

export function PokemonPagination(props: Readonly<IProps>) {
  const { count, page, rowsPage, handleChangePage } = props;

  const maxPage = Math.ceil(count / rowsPage);

  const jumpPageHandle = useCallback(
    (page: number) => {
      return (e: MouseEvent<HTMLAnchorElement>) => handleChangePage(e, page);
    },
    [handleChangePage],
  );

  const showPages = useMemo(() => {
    const total = 3;
    if (page >= 0 && page <= total - 1) {
      const count = new Array(total).fill(0).map((_, index) => index);

      if (count[count.length - 1] === page) {
        return [...count, count[count.length - 1] + 1];
      } else {
        return count;
      }
    } else if (page >= maxPage - total && page <= maxPage - 1) {
      const count = new Array(total).fill(0).map((_, index) => maxPage - total + index);

      if (count[0] === page) {
        return [count[0] - 1, ...count];
      } else {
        return count;
      }
    } else {
      return new Array(total).fill(0).map((_, index) => page + index - 1);
    }
  }, [maxPage, page]);

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={jumpPageHandle(Math.max(0, page - 1))} />
        </PaginationItem>

        {showPages[0] > 0 ? (
          <>
            <PaginationItem>
              <PaginationLink onClick={jumpPageHandle(0)}>1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : null}

        {showPages.map((p) => {
          return (
            <PaginationItem key={`pokemon-page-${p}`}>
              <PaginationLink onClick={jumpPageHandle(p)} isActive={p === page}>
                {p + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {showPages[showPages.length - 1] < maxPage - 1 ? (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink onClick={jumpPageHandle(maxPage - 1)}>{maxPage}</PaginationLink>
            </PaginationItem>
          </>
        ) : null}

        <PaginationItem>
          <PaginationNext onClick={jumpPageHandle(Math.min(maxPage - 1, page + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
