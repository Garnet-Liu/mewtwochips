"use client";

import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  show?: boolean;
  loading: boolean;
  children: ReactNode;
  className?: string;
}

export function Spin(props: Readonly<Props>) {
  const { show = false, loading, children, className } = props;
  return (
    <main className={cn("relative h-full w-full", className)}>
      {loading ? (
        show ? (
          children
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin" size={24} />
          </div>
        )
      ) : (
        children
      )}
    </main>
  );
}
