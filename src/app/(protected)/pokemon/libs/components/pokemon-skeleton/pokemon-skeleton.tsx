import { HTMLAttributes } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PokemonSkeleton({ className }: HTMLAttributes<HTMLDivElement>) {
  const skeleton = Array.from({ length: 15 }).map((_, index) => index);
  return (
    <div className={cn("grid min-h-[1009px] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3", className)}>
      {skeleton.map((index) => {
        return <Skeleton key={index} className="h-[328.4px]" />;
      })}
    </div>
  );
}
