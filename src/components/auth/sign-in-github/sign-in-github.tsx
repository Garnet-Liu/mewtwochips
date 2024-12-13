"use client";

import { LoaderCircle } from "lucide-react";

import { useAuthHandle } from "@/hooks";
import { Github } from "@/components/svgs";
import { Button } from "@/components/ui/button";

export function SignInGithub() {
  const { signInWithGithub, isLoading } = useAuthHandle();

  return (
    <Button variant="outline" type="button" onClick={signInWithGithub} disabled={isLoading}>
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Github fill="currentColor" className="mr-2 h-4 w-4" />
      )}
      Github
    </Button>
  );
}
