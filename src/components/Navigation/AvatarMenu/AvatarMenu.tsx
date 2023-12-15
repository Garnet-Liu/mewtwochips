"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/themes";

export function AvatarMenu() {
  const { data: session, status } = useSession();
  return (
    <div className="relative">
      {status === "loading" && (
        <div className="absolute left-0 top-0 -m-1 box-content h-full w-full rounded-full border-4 border-l-transparent duration-700 ease-linear animate-in spin-in-[360deg] repeat-infinite" />
      )}

      <Avatar
        size="4"
        radius="full"
        fallback={session?.user?.name?.charAt(0) ?? "?"}
        src={session?.user?.image ?? undefined}
      />
    </div>
  );
}
