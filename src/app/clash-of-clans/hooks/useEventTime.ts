import { useCallback } from "react";
import { DateTime } from "luxon";

import { IEventTime } from "../interfaces/clashOfSlans.interface";

export interface IEventTimes {
  getCWLTime(): IEventTime;

  getGoldPass(): IEventTime;

  getClanGames(): IEventTime;

  getLeagueReset(): IEventTime;

  getRaidWeekend(): IEventTime;

  getTraderRefresh(): IEventTime;
}

export const useEventTime = (): IEventTimes => {
  const getCWLTime = useCallback((): IEventTime => {
    const now = DateTime.local();
    const nowDay = now.get("day");
    const nowHours = now.get("hour");
    const CWLTime = now
      .plus({ months: (nowDay === 11 && nowHours < 16) || nowDay < 11 ? 0 : 1 })
      .set({
        day:
          (nowDay <= 1 && nowHours < 16) || (nowDay === 11 && nowHours >= 16) || nowDay > 11
            ? 1
            : 11,
        hour: 16,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    return {
      active:
        ((nowDay === 1 && nowHours >= 16) || nowDay > 1) &&
        (nowDay < 11 || (nowDay === 11 && nowHours < 16)),
      time: CWLTime.diff(now, ["days", "hours", "minutes", "seconds"]).toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  const getRaidWeekend = useCallback(() => {
    const now = DateTime.local();
    const nowWeekDay = now.get("weekday");
    const nowHours = now.get("hour");
    const raidWeekendTime = now
      .plus({ weeks: nowWeekDay < 5 || (nowWeekDay === 5 && nowHours < 15) ? 0 : 1 })
      .set({
        weekday:
          (nowWeekDay > 1 || (nowWeekDay === 1 && nowHours >= 15)) &&
          (nowWeekDay < 5 || (nowWeekDay === 5 && nowHours < 15))
            ? 5
            : 1,
        hour: 15,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    return {
      active:
        (nowWeekDay <= 1 && nowHours < 15) ||
        nowWeekDay > 5 ||
        (nowWeekDay === 5 && nowHours >= 15),
      time: raidWeekendTime
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  const getTraderRefresh = useCallback(() => {
    const now = DateTime.local();
    const nowWeekDay = now.get("weekday");
    const nowHours = now.get("hour");
    const traderRefreshTime = now
      .plus({ weeks: nowWeekDay < 2 || (nowWeekDay === 2 && nowHours < 16) ? 0 : 1 })
      .set({
        weekday: 2,
        hour: 16,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    return {
      active: true,
      time: traderRefreshTime
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  const getLeagueReset = useCallback(() => {
    const now = DateTime.local();
    let lastMondayOfMonth = now.endOf("month").startOf("week").set({
      hour: 13,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    if (now.diff(lastMondayOfMonth).valueOf() > 0) {
      lastMondayOfMonth = now.plus({ months: 1 }).endOf("month").startOf("week");
    }
    const leagueResetTime = lastMondayOfMonth.set({
      hour: 13,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return {
      active: true,
      time: leagueResetTime
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  const getClanGames = useCallback(() => {
    const now = DateTime.local();
    const nowDay = now.get("day");
    const nowHours = now.get("hour");
    const clanGamesTime = now
      .plus({ month: nowDay > 28 || (nowDay === 28 && nowHours >= 16) ? 1 : 0 })
      .set({
        day: nowDay > 22 || (nowDay === 22 && nowHours >= 16) ? 28 : 22,
        hour: 16,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
    return {
      active:
        (nowDay > 22 || (nowDay === 22 && nowHours >= 16)) &&
        (nowDay < 28 || (nowDay === 28 && nowHours < 16)),
      time: clanGamesTime
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  const getGoldPass = useCallback(() => {
    const now = DateTime.local();
    const nowDay = now.get("day");
    const nowHours = now.get("hour");
    const goldPassTime = now.plus({ month: nowDay <= 1 && nowHours < 16 ? 0 : 1 }).set({
      day: 1,
      hour: 16,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return {
      active: true,
      time: goldPassTime
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toFormat("d天h小时m分钟s秒"),
    };
  }, []);

  return {
    getCWLTime,
    getGoldPass,
    getClanGames,
    getLeagueReset,
    getRaidWeekend,
    getTraderRefresh,
  };
};
