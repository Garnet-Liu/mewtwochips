"use client";

import Link from "next/link";

import { EProviderID } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { LinkGithubForm } from "@/components/auth/link-github-form";
import { checkFirebaseProvider } from "@/lib/check-firebase-provider";

export default function Page() {
  return (
    <div className="page-content flex h-full items-center justify-center">
      {checkFirebaseProvider(EProviderID.GITHUB) ? (
        <div className="flex flex-col items-center gap-4">
          <p>Linked with github.</p>

          <Link href="/public">
            <Button>Back to home</Button>
          </Link>
        </div>
      ) : (
        <LinkGithubForm />
      )}
    </div>
  );
}
