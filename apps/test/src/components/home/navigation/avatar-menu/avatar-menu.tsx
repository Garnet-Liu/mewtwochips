"use client";

import { Languages, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthHandle } from "@/hooks";
import { useT } from "@/libs/i18n/client";
import { useAuth } from "@/libs/firebase/auth-provider";
import { UserAvatar } from "@/components/home/user-avatar";

export function AvatarMenu() {
  const { t } = useT();

  const { user } = useAuth();

  const { signOut } = useAuthHandle();

  const pathname = usePathname();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="avatar btn">
          <UserAvatar user={user} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages />
              {t("change-language")}
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link className="h-full w-full" href={pathname.replace(/^\/[^/]+/, "/en")}>
                    {t("en")}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link className="h-full w-full" href={pathname.replace(/^\/[^/]+/, "/zh-CN")}>
                    {t("zh-CN")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={signOut}>
            <LogOut />
            {t("sign-out")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return <UserAvatar user={user} />;
  }
}
