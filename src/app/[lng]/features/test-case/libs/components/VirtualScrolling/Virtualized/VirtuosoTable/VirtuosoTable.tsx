"use client";

import { AutoSizer, CellMeasurerCache, Column, ColumnSizer, Table } from "react-virtualized";

import { generateRandomList } from "@/app/[lng]/features/test-case/libs";

const tableCache = new CellMeasurerCache({
  fixedWidth: false,
  fixedHeight: true,
  defaultWidth: 100,
  minHeight: 25,
});

export function VirtualizedTable() {
  const lists = generateRandomList();

  console.log("VirtualizedTable");
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <div style={{ height, width }}>
            <ColumnSizer columnMaxWidth={100} columnMinWidth={50} columnCount={4} width={width}>
              {({ adjustedWidth, columnWidth, registerChild }) => {
                return (
                  <Table
                    ref={registerChild}
                    headerHeight={20}
                    height={400}
                    overscanRowCount={2}
                    rowHeight={35}
                    rowGetter={({ index }) => lists[index % lists.length]}
                    rowCount={lists.length}
                    width={width}
                  >
                    <Column dataKey="name" label="Name" width={150} />
                    <Column dataKey="color" label="Color" width={150} />
                    <Column dataKey="random" label="Dynamic text" width={300} flexShrink={0} />
                  </Table>
                );
              }}
            </ColumnSizer>
          </div>
        );
      }}
    </AutoSizer>
  );
}
