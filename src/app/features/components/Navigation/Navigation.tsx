"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

import {
  ChatBubble,
  Form,
  LiveBroadcasting,
  Photos,
  Pokeball,
  Stopwatch,
  Toast,
  Wagmi,
  Wheel,
  Youtube,
} from "@/components/Svgs";
import { cn } from "@/context/cn";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export function Navigation() {
  const pathname = usePathname();

  const pages = useMemo(() => {
    return [
      { path: "/features/pokemon", label: "Pokémon", icon: Pokeball },
      { path: "/features/counter", label: "Counter", icon: Stopwatch },
      { path: "/features/photos", label: "Photos", icon: Photos },
      { path: "/features/live-kit", label: "Live kit", icon: LiveBroadcasting },
      { path: "/features/media-devices", label: "Media devices", icon: Youtube },
      { path: "/features/stream-chat", label: "Stream chat", icon: ChatBubble },
      { path: "/features/wagmi", label: "Wagmi", icon: Wagmi },
      { path: "/features/wheel", label: "Wheel", icon: Wheel },
      { path: "/features/react-hook-form", label: "React hooks form", icon: Form },
      { path: "/features/toast", label: "Toast", icon: Toast },
    ];
  }, []);

  return (
    <div className="flex w-60 flex-col items-center gap-4 bg-white/[.1] py-4">
      <div className="w-full px-4 text-2xl font-extrabold">
        <Link href="/public">Mewtwochips</Link>
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
