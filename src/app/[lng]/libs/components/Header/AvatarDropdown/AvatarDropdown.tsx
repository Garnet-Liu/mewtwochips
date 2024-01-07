"use client";

import { DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { AvatarMenu } from "@/app/[lng]/libs";
import { handleLogout } from "@/context/logout";

export function AvatarDropdown() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <AvatarMenu session={session} status={status} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            Edit profile
            <span className="material-symbols-outlined">account_circle</span>
          </DropdownMenu.Item>

          <form action={handleLogout}>
            <button className="w-full">
              <DropdownMenu.Item className="gap-2">
                Logout
                <span className="material-symbols-outlined">logout</span>
              </DropdownMenu.Item>
            </button>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  } else if (status === "unauthenticated") {
    return (
      <Link href={"/auth/sign-in"}>
        <AvatarMenu
          className="cursor-pointer"
          session={session}
          status={status}
          fallback={<span className="material-symbols-outlined">login</span>}
        />
      </Link>
    );
  } else {
    return <AvatarMenu className="cursor-pointer" session={session} status={status} />;
  }
}
