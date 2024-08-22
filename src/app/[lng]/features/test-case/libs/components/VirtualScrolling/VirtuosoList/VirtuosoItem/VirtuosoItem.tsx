"use client";

import { memo, MutableRefObject, useCallback } from "react";

import { BreakSpot, CellCalculate, ElementRefs } from "@/app/[lng]/features/test-case/libs";

interface Props {
  index: number;
  currentSpot: BreakSpot;
  elementRefs: MutableRefObject<ElementRefs>;
}

export const VirtuosoItem = memo(function VirtuosoItemMemo(props: Props) {
  const { currentSpot, index, elementRefs } = props;

  const createStyles = useCallback(
    (key: keyof ElementRefs) => {
      const width = elementRefs.current[key].width;
      return width ? { width: `${width}px` } : {};
    },
    [elementRefs],
  );

  return (
    <div className="flex h-8 items-center gap-4" style={{ backgroundColor: currentSpot.color }}>
      <CellCalculate index={index} elementRefs={elementRefs} cacheKey="first">
        {(ref) => (
          <p ref={ref} style={createStyles("first")} className="bg-blue-600">
            {currentSpot.color}
          </p>
        )}
      </CellCalculate>

      <CellCalculate index={index} elementRefs={elementRefs} cacheKey="second">
        {(ref) => (
          <p ref={ref} style={createStyles("second")} className="bg-amber-500">
            {currentSpot.name}
          </p>
        )}
      </CellCalculate>

      <p className="w-0 flex-1 truncate">{currentSpot.randomLong}</p>

      <CellCalculate index={index} elementRefs={elementRefs} cacheKey="third">
        {(ref) => (
          <p ref={ref} style={createStyles("third")} className="bg-pink-600">
            {currentSpot.index}
          </p>
        )}
      </CellCalculate>
    </div>
  );
});
