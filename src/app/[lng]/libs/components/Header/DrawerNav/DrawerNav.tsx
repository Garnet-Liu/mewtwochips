"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconButton, Link } from "@radix-ui/themes";
import NextLink from "next/link";

import { ILanguage } from "@/types/globals";
import { DarkMode } from "../DarkMode/DarkMode";
import { Translate } from "../Translate/Translate";

interface Props extends ILanguage {
  navigations: Array<{ path: string; label: string }>;
}

export function DrawerNav(props: Props) {
  const { navigations, lng } = props;

  return (
    <div className="flex h-full flex-col gap-4 py-2">
      <div className="mx-2 flex items-center justify-between">
        <DialogPrimitive.Close className="m-4" asChild>
          <IconButton variant="soft">
            <span className="material-symbols-outlined rotate-180">menu_open</span>
          </IconButton>
        </DialogPrimitive.Close>
      </div>

      <div className="flex flex-1 flex-col gap-4">
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

      <div className="mx-2 flex items-center justify-between">
        <Translate lng={lng} />

        <DarkMode lng={lng} />
      </div>
    </div>
  );
}
