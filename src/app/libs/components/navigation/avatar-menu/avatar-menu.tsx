"use client";

import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

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
        <DropdownMenuTrigger aria-label="avatar btn">
          <UserAvatar session={session} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return <UserAvatar session={session} />;
  }
}
