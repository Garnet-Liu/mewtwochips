"use client";

import { LoaderCircle } from "lucide-react";

import { useAuthHandle } from "@/hooks";
import { Google } from "@/components/svgs";
import { Button } from "@/components/ui/button";

export function SignInGoogle() {
  const { signInWithGoogle, isLoading } = useAuthHandle();

  return (
    <Button variant="outline" type="button" onClick={signInWithGoogle} disabled={isLoading}>
      {isLoading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Google fill="currentColor" className="h-4 w-4" />
      )}
      Google
    </Button>
  );
}
