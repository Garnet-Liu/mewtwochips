"use client";

import { AutoSizer, CellMeasurer, CellMeasurerCache, MultiGrid } from "react-virtualized";
import { useRef } from "react";

import { BreakSpot, generateRandomList } from "@/app/[lng]/features/test-case/libs";

const multiGridCache = new CellMeasurerCache({
  defaultWidth: 150,
  fixedHeight: true,
  defaultHeight: 30,
});

export function VirtuosoMultiGrid() {
  const lists = generateRandomList();

  const registerChild = useRef<HTMLDivElement>(null);

  console.log(multiGridCache);
  return (
    <>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <div style={{ height, width }} ref={registerChild}>
              <MultiGrid
                columnWidth={multiGridCache.columnWidth}
                deferredMeasurementCache={multiGridCache}
                fixedColumnCount={1}
                fixedRowCount={0}
                width={width}
                height={400}
                rowCount={50}
                rowHeight={30}
                columnCount={4}
                // overscanColumnCount={0}
                // overscanRowCount={0}
                cellRenderer={({ columnIndex, rowIndex, key, parent, style }) => {
                  const datum = lists[(rowIndex + columnIndex) % lists.length];

                  let content = getContent({ index: columnIndex, datum, long: true });

                  if (columnIndex === 0) {
                    content = content?.substring(0, 50);
                  }

                  return (
                    <CellMeasurer
                      cache={multiGridCache}
                      columnIndex={columnIndex}
                      key={key}
                      parent={parent}
                      rowIndex={rowIndex}
                    >
                      {({ registerChild }) => (
                        <div
                          // @ts-ignore
                          ref={registerChild}
                          // className="truncate"
                          style={{ ...style, textWrap: "nowrap" }}
                        >
                          {content}
                        </div>
                      )}
                    </CellMeasurer>
                  );
                }}
              />
            </div>
          );
        }}
      </AutoSizer>
    </>
  );
}

function getContent(props: { index: number; long: boolean; datum: BreakSpot }) {
  const { index, datum, long = true } = props;
  switch (index % 4) {
    case 0:
      return datum.color;
    case 1:
      return datum.name;
    case 2:
      return long ? datum.randomLong : datum.random;
    case 3:
      return datum.index.toString();
  }
}
