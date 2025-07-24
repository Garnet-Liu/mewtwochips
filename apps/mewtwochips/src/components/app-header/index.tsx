import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";
import Link from "next/link";

import { HeaderDrawer } from "@/components/app-header/header-drawer";
import { HeaderList } from "@/components/app-header/header-list";
import { HeaderThemes } from "@/components/app-header/header-themes";
import { HeaderUser } from "@/components/app-header/header-user";

export function AppHeader() {
  return (
    <header className="px-4 shadow-lg">
      {/* use web */}
      <section className="container mx-auto hidden h-16 items-center gap-8 sm:flex">
        <p>Mewtwochips</p>

        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/dashboard">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <HeaderList title="Villages" href="/villages" items={[]}></HeaderList>
            <HeaderList title="Player" href="/player" items={[]}></HeaderList>
            <HeaderList title="Clash" href="/clash" items={[]}></HeaderList>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex gap-4">
          <HeaderThemes />

          <HeaderUser />
        </div>
      </section>

      {/* use mobile */}
      <section className="container mx-auto flex h-16 items-center gap-4 sm:hidden">
        <HeaderDrawer />

        <p>Mewtwochips</p>

        <HeaderThemes className="ml-auto" />
      </section>
    </header>
  );
}
