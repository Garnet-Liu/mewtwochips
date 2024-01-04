import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Callout, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

import { cn } from "@/context/cn";
import { AddVillage, QuerySearchVillage } from "@/app/[lng]/search/libs";

interface Props {
  search: string;
  className?: string;
}

export function VillageInfo(props: Props) {
  const { className, search } = props;
  const { data } = useSuspenseQuery(QuerySearchVillage, {
    variables: { tag: search },
    skip: !search,
  });

  console.log("data", data);

  if (data?.village?.__typename === "TVillage") {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center gap-1">
          {data.village.league?.iconUrls?.medium && (
            <Image
              src={data.village.league.iconUrls.medium}
              width={100}
              height={100}
              alt="league"
            />
          )}
          <p>{data.village.tag}</p>
          <p>{data.village.name}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          {data.village.clan?.badgeUrls?.medium && (
            <Image src={data.village.clan.badgeUrls.medium} width={100} height={100} alt="badge" />
          )}
          <p>{data.village.clan?.tag}</p>
          <p>{data.village.clan?.name}</p>
        </div>

        <div className="col-span-2 grid grid-cols-3 gap-3">
          <Callout.Root className="col-span-3">
            <Callout.Icon>
              <span className="material-symbols-outlined">info</span>
            </Callout.Icon>

            <Callout.Text>
              如果你确定这就是你的村庄请点击添加，如果不是请检查你的标签是否正确
            </Callout.Text>
          </Callout.Root>

          <span className="col-span-1" />

          <AddVillage tag={data.village.clan?.tag ?? ""} />
        </div>
      </div>
    );
  } else if (data?.village?.__typename === "TClientError") {
    return (
      <div className="flex flex-col gap-2">
        <p>{data.village?.reason}</p>
        <p>{data.village?.message}</p>
      </div>
    );
  } else {
    return (
      <Flex className={cn(className)} gap="4" direction="column">
        <Text as="p">你的村庄标在你个人信息的名字下面，点击名字旁边的分享按钮可以直接复制</Text>

        <Text as="p">你可以点击左上角你的经验值的位置，打开个人信息界面</Text>

        <Text as="p">点击搜索之后你的个人信息将会展示在此处</Text>
      </Flex>
    );
  }
}
