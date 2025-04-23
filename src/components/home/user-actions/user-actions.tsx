"use client";

import Link from "next/link";

import { useAuthHandle } from "@/hooks";
import { Button } from "@/components/ui/button";

export function UserActions() {
  const { signOut } = useAuthHandle();

  return (
    <div className="flex gap-3">
      <Link className="flex-1" href={`/src/app/%5Blng%5D/auth/change-password`}>
        <Button className="w-full">Change password</Button>
      </Link>

      <Button className="flex-1" variant="outline" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}
