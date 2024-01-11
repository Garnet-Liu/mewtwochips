"use client";

import { Avatar, Button } from "@radix-ui/themes";
import { DecodedIdToken } from "firebase-admin/auth";

interface Props {
  session: DecodedIdToken;
}

export function UserProfile(props: Props) {
  const { session } = props;

  const handleSignOut = () => {
    // return signOut();
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Avatar
          size="9"
          radius="full"
          fallback={session?.display_name?.charAt(0) ?? "?"}
          src={session.picture ?? undefined}
        />

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <p className="w-32 font-semibold">Username:</p>
            <p>{session?.name}</p>
          </div>

          <div className="flex gap-2">
            <p className="w-32 font-semibold">Email: </p>
            <p>{session?.email}</p>
          </div>

          <p className="font-black">A site for lovers of Pokémon and chips</p>
        </div>
      </div>

      <Button size="4" onClick={handleSignOut}>
        SignOut
      </Button>
    </div>
  );
}
