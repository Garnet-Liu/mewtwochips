"use client";

import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "next-themes";

export function DarkProviders(props: ThemeProviderProps) {
  const { children, ...other } = props;
  return <ThemeProvider {...other}>{children}</ThemeProvider>;
}
