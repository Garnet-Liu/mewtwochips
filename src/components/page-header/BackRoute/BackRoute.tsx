"use client";

import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface IBackRouteProps {
  href: string;
  children?: ReactNode;
}

export function BackRoute(props: IBackRouteProps) {
  const { href, children } = props;
  return (
    <Link className="flex" href={href}>
      {children ? (
        children
      ) : (
        <Button size="icon" variant="ghost" aria-label="back route">
          <ChevronLeft size={16} />
        </Button>
      )}
    </Link>
  );
}
