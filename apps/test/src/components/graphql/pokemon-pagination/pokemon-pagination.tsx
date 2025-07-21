"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useQueryRefHandlers } from "@apollo/client";
import { useCallback, useMemo } from "react";

import { Maybe } from "@/types/maybe";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

export const LIMIT = 10;

interface IProps {
  count: Maybe<number>;
  offset: Maybe<number>;
  refetch: ReturnType<typeof useQueryRefHandlers>["refetch"];
}

export function PokemonPagination(props: IProps) {
  const { count, offset, refetch } = props;

  const { max, page } = useMemo(() => {
    return {
      page: (offset ?? 0) / LIMIT,
      max: Math.ceil((count ?? 0) / LIMIT),
    };
  }, [count, offset]);

  const reQueryHandle = useCallback(
    (page: number) => {
      return () => {
        refetch({ offset: page * LIMIT }).catch((e) => {
          console.warn(e);
        });
      };
    },
    [refetch],
  );

  return (
    <Pagination className="justify-end">
      <div className="flex w-32 items-center justify-center text-sm font-medium">
        Page {page + 1} of {max}
      </div>

      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={page <= 0}
            onClick={reQueryHandle(0)}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronsLeft />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={page <= 0}
            onClick={reQueryHandle((page ?? 0) - 1)}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={page >= max - 1}
            onClick={reQueryHandle((page ?? 0) + 1)}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={page >= max - 1}
            onClick={reQueryHandle(max - 1)}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronsRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
