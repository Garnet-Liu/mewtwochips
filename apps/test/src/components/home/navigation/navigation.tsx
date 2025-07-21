import { FunctionComponent, HTMLAttributes, type SVGProps } from "react";
import Link from "next/link";

import { cn } from "@/common/utils";
import { getT } from "../../../libs/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { AvatarMenu, MenuList, ModeToggle } from "@/components/home/navigation";
import { Css3, File, Form, Globe, Gobang, Graphql, Photos, Pokeball } from "@/components/svgs";

export interface NavigationPage {
  path: string;
  label: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  description?: string;
  children?: NavigationPage[];
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  lang: string;
}

export async function Navigation(props: Props) {
  const { lang, className } = props;

  const { t } = await getT();

  const pageConfig: NavigationPage[] = [
    { path: "/pokemon", label: t("navigation.pokémon"), Icon: Pokeball },
    { path: "/photos", label: t("navigation.photos"), Icon: Photos },
    { path: "/gobang", label: t("navigation.gobang"), Icon: Gobang },
    {
      path: "/features",
      label: t("navigation.features"),
      Icon: Globe,
      children: [
        {
          path: "/features/counter",
          label: t("translation:navigation.counter.label"),
          description: t("translation:navigation.counter.description"),
          Icon: File,
        },
        {
          path: "/features/react-form",
          label: t("translation:navigation.react-form.label"),
          description: t("translation:navigation.react-form.description"),
          Icon: Form,
        },
        {
          path: "/features/graphql",
          label: t("translation:navigation.graphql.label"),
          description: t("translation:navigation.graphql.description"),
          Icon: Graphql,
        },
        {
          path: "/features/animations",
          label: t("translation:navigation.animations.label"),
          description: t("translation:navigation.animations.description"),
          Icon: Css3,
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 min-w-[1200px] border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <nav className={cn("page-content flex items-center gap-4 px-3", className)} {...props}>
        <Link className="text-2xl font-extrabold" href="/">
          Mewtwochips
        </Link>

        <div className="mx-6 flex flex-1 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {pageConfig.map((page) => {
                const Icon = page.Icon;
                return (
                  <NavigationMenuItem key={`nav-${page.path}`} value={page.path}>
                    {page.children?.length ? (
                      <>
                        <NavigationMenuTrigger className="gap-1">
                          <Icon fill="currentColor" /> {page.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <MenuList pages={page} />
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${lang}${page.path}`}
                          className={cn(navigationMenuTriggerStyle(), "gap-1")}
                        >
                          <Icon fill="currentColor" /> {page.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>

            <NavigationMenuIndicator>
              <div className="relative top-[60%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
            </NavigationMenuIndicator>

            <NavigationMenuViewport className="shadow-blue-500/50" />
          </NavigationMenu>
        </div>

        <AvatarMenu />

        <ModeToggle />
      </nav>
    </header>
  );
}
