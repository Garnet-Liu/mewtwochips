"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useMemo } from "react";

export default function MuiProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme({ palette: { mode: prefersDarkMode ? "dark" : "light" } });
  }, [prefersDarkMode]);

  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  );
}
