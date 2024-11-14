"use client";

import { useGoogleAuthHandle } from "@/hooks";
import { Button } from "@/components/ui/button";

export function UserSignOut() {
  const { signOut } = useGoogleAuthHandle();

  return (
    <Button onClick={signOut} size="sm">
      Sign out
    </Button>
  );
}
