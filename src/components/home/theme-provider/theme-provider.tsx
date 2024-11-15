"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  const { children, ...other } = props;
  return <NextThemesProvider {...other}>{children}</NextThemesProvider>;
}
