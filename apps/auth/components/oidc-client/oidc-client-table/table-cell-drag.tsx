import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@repo/ui/components/button";
import type { CellContext } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import z from "zod";

import { schema } from "./schema";

export function TableCellDrag({ row }: CellContext<z.infer<typeof schema>, unknown>) {
  const { attributes, listeners } = useSortable({ id: row.original.id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
