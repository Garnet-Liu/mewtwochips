import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import type { PropsWithChildren } from "react";

import "./style.css";

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="h-screen w-screen">
        {children}

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
