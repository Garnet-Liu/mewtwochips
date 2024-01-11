"use client";

import { DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";

import { AvatarMenu } from "@/app/[lng]/libs";
import { handleLogout } from "@/context/logout";
import { clientAuth, EAuthState, useCurrentUser } from "@/context/firebase/client";

export function AvatarDropdown() {
  const { currentUser, status } = useCurrentUser();

  if (status === EAuthState.AUTHENTICATED) {
    const handleSubmit = async () => {
      await handleLogout();
      await clientAuth().signOut();
    };
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <AvatarMenu user={currentUser} status={status} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            Edit profile
            <span className="material-symbols-outlined">account_circle</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onClick={handleSubmit}>
            Logout
            <span className="material-symbols-outlined">logout</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  } else if (status === EAuthState.UNAUTHENTICATED) {
    return (
      <Link href={"/auth/sign-in"}>
        <AvatarMenu
          className="cursor-pointer"
          user={currentUser}
          status={status}
          fallback={<span className="material-symbols-outlined">login</span>}
        />
      </Link>
    );
  } else {
    return <AvatarMenu className="cursor-pointer" user={currentUser} status={status} />;
  }
}
