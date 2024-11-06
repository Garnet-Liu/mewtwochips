"use client";

import { Button } from "@/components/ui/button";
import { useGoogleAuthHandle } from "@/app/libs/hooks";

export function UserSignOut() {
  const { signOut } = useGoogleAuthHandle();

  return (
    <Button onClick={signOut} size="sm">
      Sign out
    </Button>
  );
}
