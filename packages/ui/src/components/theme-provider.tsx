import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";
import type { PropsWithChildren } from "react";

export function ThemeProvider({ children, ...props }: PropsWithChildren<ThemeProviderProps>) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
