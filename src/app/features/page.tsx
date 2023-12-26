"use client";

import { useSession } from "next-auth/react";

import { UserProfile } from "@/app/features/components/UserProfile/UserProfile";
import { LoginProvider } from "@/app/features/components/LoginProvider/LoginProvider";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <main className="flex h-full flex-col items-center justify-center">
      {status === "authenticated" ? (
        <UserProfile session={session} />
      ) : status === "unauthenticated" ? (
        <LoginProvider />
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
}
