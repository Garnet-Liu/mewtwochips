import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { PropsWithChildren } from "react";
import { redirect } from "vike/abort";
import { useData } from "vike-react/useData";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { authClient } from "@/lib/auth-client";
import { Data } from "@/pages/+data";

export default function AuthLayout({ children }: PropsWithChildren) {
  const session = useData<Data>();

  const s = authClient.useSession();

  console.log(session?.session.role);
  console.log(s?.data?.session.role);

  if (!session) {
    throw redirect("/sign-in");
  } else {
    return (
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <AppHeader />

          <section className="flex flex-1 flex-col gap-4 p-4">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    );
  }
}
