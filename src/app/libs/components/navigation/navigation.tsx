"use client";

import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Photos, Pokeball } from "@/components/svgs";
import { AvatarMenu } from "@/app/libs/components/navigation";

const PAGES = [
  { path: "/pokemon", label: "Pokémon", Icon: Pokeball },
  { path: "/photos", label: "Photos", Icon: Photos },
  { path: "/features", label: "Features", Icon: Photos },
];

export function Navigation(props: HTMLAttributes<HTMLElement>) {
  const { className } = props;
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <nav className={cn("max-width flex items-center py-2", className)} {...props}>
        <Link className="text-2xl font-extrabold" href="/">
          Mewtwochips
        </Link>

        <div className="mx-6 flex flex-1 items-center space-x-4 lg:space-x-6">
          {PAGES.map((page) => {
            const Icon = page.Icon;
            return (
              <Link
                key={`nav-${page.path}`}
                href={page.path}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname.includes(page.path) && "text-muted-foreground",
                )}
              >
                <Icon />
                {page.label}
              </Link>
            );
          })}
        </div>

        <AvatarMenu />
      </nav>
    </header>
  );
}
