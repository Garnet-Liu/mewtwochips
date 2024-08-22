"use client";

import { AutoSizer, CellMeasurer, CellMeasurerCache, Grid } from "react-virtualized";
import { useRef } from "react";

import { BreakSpot, generateRandomList } from "@/app/[lng]/features/test-case/libs";

const gridCache = new CellMeasurerCache({
  defaultWidth: 200,
  fixedHeight: true,
  minWidth: 10,
});

export function VirtualizedGrid() {
  const lists = generateRandomList();

  const registerChild = useRef<HTMLDivElement>(null);

  return (
    <>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <div style={{ height, width }} ref={registerChild}>
              <Grid
                height={400}
                width={width}
                rowHeight={gridCache.rowHeight}
                rowCount={50}
                columnCount={4}
                columnWidth={({ index }) => {
                  if (index === 2) {
                    // const wrap = registerChild.current?.firstElementChild as HTMLDivElement;
                    // const scrollBarWidth = (wrap?.offsetWidth ?? 0) - (wrap?.clientWidth ?? 0);
                    // return (
                    //   width -
                    //   gridCache.columnWidth({ index: 0 }) -
                    //   gridCache.columnWidth({ index: 1 }) -
                    //   gridCache.columnWidth({ index: 3 }) -
                    //   scrollBarWidth
                    // );
                    return gridCache.columnWidth({ index });
                  } else {
                    return gridCache.columnWidth({ index });
                  }
                }}
                // deferredMeasurementCache={gridCache}
                cellRenderer={({ columnIndex, key, parent, rowIndex, style }) => {
                  const datum = lists[rowIndex % lists.length];
                  const content = getContent({ index: columnIndex, datum, long: true });

                  if (columnIndex === 2) {
                    // console.log("Grid => cellRenderer");
                    return (
                      <div key={key} className="truncate" style={{ ...style, height: 35 }}>
                        {content}
                      </div>
                    );
                  }

                  return (
                    <CellMeasurer
                      key={key}
                      parent={parent}
                      cache={gridCache}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                    >
                      {({ registerChild }) => (
                        <div
                          // @ts-ignore
                          ref={registerChild}
                          className="truncate"
                          style={{ ...style, height: 35 }}
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
      return datum.index;
  }
}
