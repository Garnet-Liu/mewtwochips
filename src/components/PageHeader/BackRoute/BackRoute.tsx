"use client";

import { IconButton } from "@radix-ui/themes";
import { ReactNode } from "react";
import Link from "next/link";

interface IBackRouteProps {
  href: string;
  children?: ReactNode;
}

export default function BackRoute({ href, children }: IBackRouteProps) {
  return (
    <Link href={href}>
      {children ?? (
        <IconButton aria-label="back route">
          <span className="material-symbols-outlined">arrow_back</span>
        </IconButton>
      )}
    </Link>
  );
}
