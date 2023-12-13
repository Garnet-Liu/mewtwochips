"use client";

import { useSession } from "next-auth/react";

import { UserProfile } from "@/app/components/UserProfile/UserProfile";
import { LoginProvider } from "@/app/components/LoginProvider/LoginProvider";

export default function Home() {
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
