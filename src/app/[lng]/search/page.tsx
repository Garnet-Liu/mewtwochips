"use client";

import { Box, Tabs, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import { cn } from "@/context/cn";

export default function Page() {
  const searchParams = useSearchParams();
  const target = searchParams.get("target");
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4">
      <Tabs.Root defaultValue={target === "clans" ? "clans" : "players"}>
        <Tabs.List>
          <Tabs.Trigger value="players">查找玩家</Tabs.Trigger>
          <Tabs.Trigger value="clans">查找部落</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content
            className={cn([
              "data-[state=active]:duration-700",
              "data-[state=active]:animate-in",
              "data-[state=active]:fade-in",
            ])}
            value="players"
          >
            <Text size="2">This search your</Text>
          </Tabs.Content>

          <Tabs.Content
            className={cn([
              "data-[state=active]:duration-700",
              "data-[state=active]:animate-in",
              "data-[state=active]:fade-in",
            ])}
            value="clans"
          >
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </main>
  );
}
