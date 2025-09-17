import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { useTheme } from "@repo/ui/hooks/use-theme";
import { SunMoon } from "lucide-react";
import { useMemo } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { items } from "@/lib/sidebar-items";
import { checkPath } from "@/utils/check-path";

export function AppHeader() {
  const { setTheme } = useTheme();

  const { urlPathname } = usePageContext();

  const title = useMemo(() => {
    return items.reduce((title, current) => {
      return title || (checkPath(urlPathname, current.url) ? current.title : title);
    }, "");
  }, [urlPathname]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-base font-medium">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          <SunMoon />
        </Button>
      </div>
    </header>
  );
}
