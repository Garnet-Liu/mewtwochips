"use client";

import { CircularProgress } from "@mui/material";

import { useCWLTime } from "@/hooks/repeating-event-time.hook";
import { IEventTime } from "@/interfaces/clash-of-clans.interface";

interface IEventItemProps {
  name: { active: string; inactive: string } | string;

  getCurrentDate(): IEventTime;
}

export default function EventItem({ name, getCurrentDate }: IEventItemProps) {
  const dateStatus = useCWLTime(getCurrentDate);
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
        <p className="text-center font-bold text-teal-700">{getShowName()}</p>

        <p className="text-center h-7 leading-7">{dateStatus.time}</p>
      </div>
    );
  } else {
    return (
      <div className="my-3 h-[52px] flex justify-center items-center">
        <CircularProgress/>
      </div>
    );
  }
}
