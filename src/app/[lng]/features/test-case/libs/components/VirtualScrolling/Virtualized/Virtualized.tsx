"use client";

import { Box, Tabs } from "@radix-ui/themes";

import {
  VirtualizedGrid,
  VirtualizedTable,
  VirtuosoMultiGrid,
} from "@/app/[lng]/features/test-case/libs";

import "react-virtualized/styles.css";

export function Virtualized() {
  return (
    <Tabs.Root defaultValue="grid" className="flex h-full flex-col">
      <Tabs.List>
        <Tabs.Trigger value="table">Table</Tabs.Trigger>
        <Tabs.Trigger value="grid">Grid</Tabs.Trigger>
        <Tabs.Trigger value="multiGrid">MultiGrid</Tabs.Trigger>
      </Tabs.List>

      <Box pt="3" className="flex flex-1 flex-col">
        <Tabs.Content value="table" className="h-full">
          <VirtualizedTable />
        </Tabs.Content>

        <Tabs.Content value="grid" className="h-full">
          <VirtualizedGrid />
        </Tabs.Content>

        <Tabs.Content value="multiGrid" className="h-full">
          <VirtuosoMultiGrid />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
