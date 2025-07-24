"use client";

import { Button } from "@repo/ui/components/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { ComponentProps, useCallback } from "react";

export function HeaderThemes(props: ComponentProps<typeof Button>) {
  const { setTheme } = useTheme();

  const changeThemesHandle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return (
    <Button size="icon" variant="ghost" onClick={changeThemesHandle} {...props}>
      <SunMoon />
    </Button>
  );
}
