"use client";

import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGoogleAuthHandle } from "@/app/libs/hooks";
import { UserAvatar } from "@/app/libs/components/user-avatar";

export function AvatarMenu() {
  const { data: session } = useSession();

  const { signOut } = useGoogleAuthHandle();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar session={session} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return <UserAvatar session={session} />;
  }
}
