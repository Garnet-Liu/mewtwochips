import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

import "./style.css";

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}

        <Toaster />
      </ThemeProvider>
    </div>
  );
}
