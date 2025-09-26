import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useToast } from "@repo/ui/hooks/use-toast";
import type { CellContext } from "@tanstack/react-table";
import z from "zod";

import { schema } from "./schema";

export const TableCellTarget = ({ row }: CellContext<z.infer<typeof schema>, unknown>) => {
  const toast = useToast();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: `Saving ${row.original.header}`,
          success: "Done",
          error: "Error",
        });
      }}
    >
      <Label htmlFor={`${row.original.id}-target`} className="sr-only">
        Target
      </Label>
      <Input
        className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
        defaultValue={row.original.target}
        id={`${row.original.id}-target`}
      />
    </form>
  );
};
