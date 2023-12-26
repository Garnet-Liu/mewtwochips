import { IconButton, Link } from "@radix-ui/themes";
import NextLink from "next/link";

import { Drawer } from "@/components";
import { Clash } from "@/components/Svgs";
import { DarkMode } from "./DarkMode/DarkMode";
import { DrawerNav } from "./DrawerNav/DrawerNav";

export const navigations = [
  { path: "/upgrade-tracker", label: "升级追踪" },
  { path: "/state-tracker", label: "状态追踪" },
];

export function Header() {
  return (
    <header className="h-[60px] w-full">
      <div className="container mx-auto flex h-full items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-2 font-black">
          <Clash width={40} height={40} className="text-black dark:text-white" />
          Mewtwochips
        </div>

        <nav className="bg-primary hidden sm:flex sm:h-full sm:flex-1 sm:items-center">
          <div className="flex h-full flex-1 items-center gap-4 font-semibold">
            {navigations.map((navigation, index) => (
              <Link
                key={index}
                asChild
                size="4"
                weight="medium"
                className="flex h-full items-center px-2 hover:bg-[var(--accent-a3)]"
              >
                <NextLink href={navigation.path}>{navigation.label}</NextLink>
              </Link>
            ))}
          </div>

          <DarkMode />
        </nav>

        <nav className="sm:hidden">
          <Drawer content={<DrawerNav />}>
            <IconButton variant="soft">
              <span className="material-symbols-outlined">menu_open</span>
            </IconButton>
          </Drawer>
        </nav>
      </div>
    </header>
  );
}
