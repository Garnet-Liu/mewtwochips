"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

import {
  ChatBubble,
  Clash,
  LiveBroadcasting,
  Photos,
  Pokeball,
  Stopwatch,
  Wagmi,
  Wheel,
  Youtube,
} from "@/components/svg";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";
import { cn } from "@/context/cn";

export function Navigation() {
  const pathname = usePathname();

  const pages = useMemo(() => {
    return [
      { path: "/pokemon", label: "Pokémon", icon: Pokeball },
      { path: "/clash-of-clans", label: "Clash Of Clans", icon: Clash },
      { path: "/counter", label: "Counter", icon: Stopwatch },
      { path: "/photos", label: "Photos", icon: Photos },
      { path: "/live-kit", label: "Live kit", icon: LiveBroadcasting },
      { path: "/media-devices", label: "Media devices", icon: Youtube },
      { path: "/stream-chat", label: "Stream chat", icon: ChatBubble },
      { path: "/wagmi", label: "Wagmi", icon: Wagmi },
      { path: "/wheel", label: "Wheel", icon: Wheel },
    ];
  }, []);

  console.log("pathname", pathname);

  return (
    <div className="flex w-60 flex-col items-center gap-4 bg-white/[.1] py-4">
      <div className="w-full px-4 text-2xl font-extrabold">
        <Link href="/">Mewtwochips</Link>
      </div>

      <div className="w-full flex-1">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link key={page.path} href={page.path}>
              <div
                className={cn(
                  "flex h-10 w-full items-center gap-2 px-4 hover:bg-white/25",
                  pathname === page.path && "bg-white/25",
                )}
              >
                <Icon width={24} height={24} color="white" />
                {page.label}
              </div>
            </Link>
          );
        })}
      </div>

      <AvatarMenu />
    </div>
  );
}
