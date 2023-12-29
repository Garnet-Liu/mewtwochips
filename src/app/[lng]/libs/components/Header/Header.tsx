import { IconButton, Link } from "@radix-ui/themes";
import NextLink from "next/link";

import { Drawer } from "@/components";
import { Clash } from "@/components/Svgs";
import { ILanguage } from "@/types/globals";
import { DarkMode } from "./DarkMode/DarkMode";
import { DrawerNav } from "./DrawerNav/DrawerNav";
import { Translate } from "./Translate/Translate";
import { getTranslation } from "@/app/i18n/server";

interface Props extends ILanguage {}

export async function Header(props: Props) {
  const { lng } = props;
  const { t } = await getTranslation(lng);
  const navigations = [
    { path: "/upgrade-tracker", label: t("upgrade-tracker") },
    { path: "/state-tracker", label: t("state-tracker") },
  ];

  return (
    <header className="h-[60px] w-full border-b border-black/25 dark:border-white/25">
      <div className="container mx-auto flex h-full items-center justify-between gap-8 px-4">
        <NextLink href="/" className="flex items-center gap-2 font-black">
          <Clash width={40} height={40} className="text-black dark:text-white" />
          Mewtwochips
        </NextLink>

        <nav className="bg-primary hidden sm:flex sm:h-full sm:flex-1 sm:items-center sm:gap-4">
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

          <Translate lng={lng} />

          <DarkMode lng={lng} />
        </nav>

        <nav className="sm:hidden">
          <Drawer content={<DrawerNav navigations={navigations} lng={lng} />}>
            <IconButton variant="soft">
              <span className="material-symbols-outlined">menu_open</span>
            </IconButton>
          </Drawer>
        </nav>
      </div>
    </header>
  );
}
