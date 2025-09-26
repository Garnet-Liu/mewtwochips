"use client";

import { DropdownMenuItem, DropdownMenuShortcut } from "@repo/ui/components/dropdown-menu";
import { useCallback } from "react";

import { signOut } from "@/lib/auth/auth-client";

export function HeaderUserSignOut() {
  const signOutHandle = useCallback(() => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  }, []);

  return (
    <DropdownMenuItem onClick={signOutHandle}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
