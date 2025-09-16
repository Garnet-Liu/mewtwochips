import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from "next-themes";
import { PropsWithChildren } from "react";

export function ThemeProvider({ children, ...props }: PropsWithChildren<ThemeProviderProps>) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
