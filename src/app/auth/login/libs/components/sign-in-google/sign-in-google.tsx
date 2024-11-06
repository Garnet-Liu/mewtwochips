"use client";

import { LoaderCircle } from "lucide-react";

import { Google } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { useGoogleAuthHandle } from "@/app/libs/hooks";

export function SignInGoogle() {
  const { signIn, isLoading } = useGoogleAuthHandle();

  return (
    <Button variant="secondary" type="button" onClick={signIn} disabled={isLoading}>
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Google className="mr-2 h-4 w-4" />
      )}
      Google
    </Button>
  );
}
