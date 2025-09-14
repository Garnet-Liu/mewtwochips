"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/sidebar";
import { Diff, Home, Plus } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";

import { checkPath } from "@/utils/check-path";

export const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Session list", url: "/session-list", icon: Diff },
  // { title: "React form", url: "/react-form", icon: FileText },
  // { title: "Graphql", url: "/graphql", icon: Bandage },
  // { title: "Gobang", url: "/gobang", icon: Contrast },
];

export function AppSidebar() {
  const { urlPathname } = usePageContext();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="font-bold">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Mewtwochips</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={checkPath(urlPathname, item.url)} asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
