import { useEffect, useState } from "react";

import { IEventTime } from "@/interfaces/clash-of-clans.interface";

export function useCWLTime(getCurrentDate: () => IEventTime): IEventTime | null {
  const [date, setDate] = useState<IEventTime | null>(null);

  useEffect(() => {
    console.log("useCWLTime useEffect");
    const timer = setInterval(() => {
      setDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(timer);
  }, [getCurrentDate]);

  return date;
}
