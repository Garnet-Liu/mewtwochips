"use client";

import { useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";

import { EVENT_CONFIG } from "../event-config";

interface Props {
  eventFun: keyof typeof EVENT_CONFIG;
  defaultValue: { out: boolean; time: string };
}

export function EventContainer({ eventFun, defaultValue }: Props) {
  const timeEvent = useMemo(() => EVENT_CONFIG[eventFun], [eventFun]);

  const [{ time, out }, setEvent] = useState(defaultValue);

  useInterval(() => {
    setEvent(timeEvent.event());
  }, 1000);

  return (
    <div className="space-y-1 text-center text-sm sm:text-base">
      <h3>{timeEvent.name}</h3>

      <p className="text-xs sm:text-sm">
        {out ? "Start In" : "Time Left"}: {time}
      </p>
    </div>
  );
}
