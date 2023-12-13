"use client";

import { Avatar, Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export function UserProfile(props: Props) {
  const { session } = props;

  const handleSignOut = () => {
    return signOut();
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Avatar
          size="9"
          radius="full"
          fallback={session?.user?.name?.charAt(0) ?? "?"}
          src={session?.user?.image ?? undefined}
        />

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <p className="w-32 font-semibold">Username:</p>
            <p>{session.user?.name}</p>
          </div>

          <div className="flex gap-2">
            <p className="w-32 font-semibold">Email: </p>
            <p>{session.user?.email}</p>
          </div>

          <p className="font-black">A site for lovers of Pokemon and fries</p>
        </div>
      </div>

      <Button size="4" onClick={handleSignOut}>
        SignOut
      </Button>
    </div>
  );
}
