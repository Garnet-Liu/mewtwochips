"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconButton, Link } from "@radix-ui/themes";
import NextLink from "next/link";

import { navigations } from "@/app/libs";
import { DarkMode } from "../DarkMode/DarkMode";

export function DrawerNav() {
  return (
    <div className="flex flex-col gap-4">
      <div className="m-2 flex justify-between">
        <DialogPrimitive.Close className="m-4" asChild>
          <IconButton variant="soft">
            <span className="material-symbols-outlined rotate-180">menu_open</span>
          </IconButton>
        </DialogPrimitive.Close>

        <DarkMode />
      </div>

      {navigations.map((navigation, index) => (
        <Link
          key={index}
          asChild
          size="4"
          weight="medium"
          className="flex h-12 w-full items-center px-2 hover:bg-[var(--accent-a3)]"
        >
          <NextLink href={navigation.path}>{navigation.label}</NextLink>
        </Link>
      ))}
    </div>
  );
}
