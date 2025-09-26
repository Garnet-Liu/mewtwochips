import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { headers } from "next/headers";
import Link from "next/link";

import { HeaderUserSignIn } from "@/components/app-header/header-user-sign-in";
import { HeaderUserSignOut } from "@/components/app-header/header-user-sign-out";
import { auth } from "@/lib/auth";

export async function HeaderUser() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  console.log("session", session);

  if (!session) {
    return <HeaderUserSignIn />;
  } else {
    const name = session.user.name.split(" ").reduce((n, c) => {
      return `${n}${c.charAt(0).toUpperCase()}`;
    }, "");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            {session.user.image && <AvatarImage src={session.user.image} alt="@shadcn" />}
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>Add Village</DropdownMenuItem>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <HeaderUserSignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
