"use client";

import { useEffect, useState } from "react";

import { IEventTime } from "@/app/[lng]/libs";

interface Props {
  getCurrentDate(): IEventTime;
}

export function useGetEventTime(props: Props): IEventTime | undefined {
  const { getCurrentDate } = props;
  const [date, setDate] = useState<IEventTime>();

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(timer);
  }, [getCurrentDate]);

  return date;
}
