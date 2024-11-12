import { FunctionComponent, HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
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
import { AvatarMenu, MenuList } from "@/app/libs/components/navigation";
import { File, Globe, Graphql, Photos, Pokeball } from "@/components/svgs";

export interface NavigationPage {
  path: string;
  label: string;
  Icon: FunctionComponent<{ className?: string }>;
  description?: string;
  children?: NavigationPage[];
}

const PAGES: NavigationPage[] = [
  { path: "/pokemon", label: "Pokémon", Icon: Pokeball },
  { path: "/photos", label: "Photos", Icon: Photos },
  {
    path: "/features",
    label: "Features",
    Icon: Globe,
    children: [
      {
        path: "/features/counter",
        label: "Counter",
        description: "A small example of Redux",
        Icon: File,
      },
      {
        path: "/features/graphql",
        label: "Graphql",
        description: "A test case for graphql",
        Icon: Graphql,
      },
    ],
  },
];

export function Navigation(props: HTMLAttributes<HTMLElement>) {
  const { className } = props;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <nav className={cn("max-width flex items-center py-2", className)} {...props}>
        <Link className="text-2xl font-extrabold" href="/">
          Mewtwochips
        </Link>

        <div className="mx-6 flex flex-1 items-center space-x-4 lg:space-x-6">
          {PAGES.map((page) => {
            const Icon = page.Icon;
            return (
              <NavigationMenu key={`nav-${page.path}`}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    {page.children?.length ? (
                      <>
                        <NavigationMenuTrigger className="gap-1">
                          <Icon /> {page.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <MenuList pages={page} />
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={page.path} legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-1")}>
                          <Icon /> {page.label}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuIndicator>
                  <div className="relative top-[60%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
                </NavigationMenuIndicator>

                <NavigationMenuViewport className="shadow-blue-500/50" />
              </NavigationMenu>
            );
          })}
        </div>

        <AvatarMenu />
      </nav>
    </header>
  );
}
