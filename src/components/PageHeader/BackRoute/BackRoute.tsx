"use client";

import { Box, IconButton } from "@radix-ui/themes";
import { ReactNode } from "react";
import Link from "next/link";

interface IBackRouteProps {
  href: string;
  children?: ReactNode;
}

export function BackRoute(props: IBackRouteProps) {
  const { href, children } = props;
  return (
    <Link href={href}>
      {children ?? (
        <Box m="2">
          <IconButton size="2" variant="ghost" aria-label="back route">
            <span className="material-symbols-outlined">arrow_back</span>
          </IconButton>
        </Box>
      )}
    </Link>
  );
}
