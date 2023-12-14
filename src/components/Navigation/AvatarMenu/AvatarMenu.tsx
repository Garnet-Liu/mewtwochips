"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/themes";

export function AvatarMenu() {
  const { data: session, status } = useSession();
  return (
    <Avatar
      size="4"
      radius="full"
      fallback={session?.user?.name?.charAt(0) ?? "?"}
      src={session?.user?.image ?? undefined}
    />
  );
}
