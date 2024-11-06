"use client";

import { LoaderCircle } from "lucide-react";

import { Github } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { useGoogleAuthHandle } from "@/app/libs/hooks";

export function SignInGithub() {
  const { signIn, isLoading } = useGoogleAuthHandle();

  return (
    <Button variant="outline" type="button" onClick={signIn} disabled={true}>
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Github className="mr-2 h-4 w-4" />
      )}
      Github
    </Button>
  );
}
