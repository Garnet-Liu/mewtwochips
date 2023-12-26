"use client";

import { Text } from "@radix-ui/themes";

import { IEventTime, useGetEventTime } from "@/app/libs";

interface IEventItemProps {
  name: { active: string; inactive: string } | string;

  getCurrentDate(): IEventTime;
}

export function EventItem(props: IEventItemProps) {
  const { name, getCurrentDate } = props;
  const dateStatus = useGetEventTime({ getCurrentDate });
  if (dateStatus) {
    const getShowName = () => {
      if (typeof name === "string") {
        return name;
      } else {
        return dateStatus.active ? name.active : name.inactive;
      }
    };
    return (
      <div className="my-3">
        <Text align="center" weight="bold" color="red" as="p">
          {getShowName()}
        </Text>

        <p className="h-7 text-center leading-7">{dateStatus.time}</p>
      </div>
    );
  } else {
    return (
      <div className="my-3 flex h-[52px] items-center justify-center">
        <span className="material-symbols-outlined animate-spin">sync</span>
      </div>
    );
  }
}
