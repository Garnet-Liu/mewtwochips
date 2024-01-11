"use client";

import { Box, Heading, Tabs, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import { cn } from "@/context/cn";
import { ILanguageParams } from "@/types/globals";
import { SearchVillage } from "@/app/[lng]/search/libs";

interface Props extends ILanguageParams {}

export default function Page(props: Props) {
  const { params } = props;
  const searchParams = useSearchParams();
  const target = searchParams.get("target");

  return (
    <main className="container mx-auto my-20 flex w-full flex-1 flex-col gap-8 px-4">
      <Heading size="8" align="center">
        添加你的村庄
      </Heading>

      <Tabs.Root defaultValue={target === "clans" ? "clans" : "players"}>
        <Tabs.List>
          <Tabs.Trigger value="players">查找玩家</Tabs.Trigger>
          <Tabs.Trigger value="clans">查找部落</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" py="8">
          <Tabs.Content
            className={cn([
              "data-[state=active]:duration-700",
              "data-[state=active]:animate-in",
              "data-[state=active]:fade-in",
            ])}
            value="players"
          >
            <SearchVillage lng={params.lng} />
          </Tabs.Content>

          <Tabs.Content
            className={cn([
              "data-[state=active]:duration-700",
              "data-[state=active]:animate-in",
              "data-[state=active]:fade-in",
            ])}
            value="clans"
          >
            <Text size="2">建筑工人正在努力施工，在此期间请等待施工完成。。。</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </main>
  );
}
