import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import type { PropsWithChildren } from "react";
import { redirect } from "vike/abort";
import { useData } from "vike-react/useData";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import type { Data } from "@/pages/+data";

export default function AuthLayout({ children }: PropsWithChildren) {
  const session = useData<Data>();

  if (!session) {
    throw redirect("/sign-in");
  } else {
    return (
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <AppHeader />

          <section className="flex flex-1 flex-col">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    );
  }
}
