"use client";

import { EventItem } from "./EventItem/EventItem";
import { useEventTime } from "../../hooks/useEventTime";

export function Events() {
  const {
    getClanGames,
    getCWLTime,
    getGoldPass,
    getLeagueReset,
    getRaidWeekend,
    getTraderRefresh,
  } = useEventTime();

  return (
    <div className="grid grid-cols-3 gap-3">
      <EventItem
        name={{ active: "部落联赛结束", inactive: "部落联赛开始" }}
        getCurrentDate={getCWLTime}
      />
      <EventItem
        name={{ active: "突袭周末结束", inactive: "突袭周末开始" }}
        getCurrentDate={getRaidWeekend}
      />
      <EventItem name="商店刷新" getCurrentDate={getTraderRefresh} />
      <EventItem
        name={{ active: "部落竞赛结束", inactive: "部落竞赛开始" }}
        getCurrentDate={getClanGames}
      />
      <EventItem name="赛季重置" getCurrentDate={getLeagueReset} />
      <EventItem name="月卡结算" getCurrentDate={getGoldPass} />
    </div>
  );
}
