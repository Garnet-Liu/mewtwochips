"use client";

import { Virtuoso } from "react-virtuoso";
import { useMemo, useRef } from "react";

import { generateRandomList, VirtuosoItem } from "@/app/[lng]/features/test-case/libs";

const MAX_COUNT = 2000;

export interface ElementRefs {
  first: ElementRef;
  second: ElementRef;
  third: ElementRef;
}

export interface ElementRef {
  width: number;
  els: Array<{ ref: HTMLDivElement | null; width: number }>;
}

export function VirtuosoList() {
  const lists = useMemo(() => {
    return generateRandomList(MAX_COUNT);
  }, []);

  const elementRefs = useRef<ElementRefs>({
    first: { width: 0, els: [] },
    second: { width: 0, els: [] },
    third: { width: 0, els: [] },
  });

  return (
    <div className="relative h-full overflow-hidden">
      <Virtuoso
        data={lists}
        computeItemKey={(_, item) => `virtuoso-list-item-${item.index}`}
        itemContent={(index, user) => {
          return <VirtuosoItem index={index} elementRefs={elementRefs} currentSpot={user} />;
        }}
      />
    </div>
  );
}
