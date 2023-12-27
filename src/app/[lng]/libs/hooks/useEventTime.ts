"use client";

import { useCallback } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfMonth,
  getDate,
  getDay,
  getHours,
  isAfter,
  set,
  setDay,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subHours,
  subMinutes,
} from "date-fns";

import { IEventTime } from "@/app/[lng]/libs";

export interface IEventTimes {
  getCWLTime(): IEventTime;

  getGoldPass(): IEventTime;

  getClanGames(): IEventTime;

  getLeagueReset(): IEventTime;

  getRaidWeekend(): IEventTime;

  getTraderRefresh(): IEventTime;
}

export const useEventTime = (): IEventTimes => {
  const diffToNow = useCallback((current: Date, now: Date) => {
    const diffInDays = differenceInDays(current, now);
    const subDay = subDays(current, diffInDays);
    const diffInHours = differenceInHours(subDay, now);
    const subHour = subHours(subDay, diffInHours);
    const diffInMinutes = differenceInMinutes(subHour, now);
    const subMinute = subMinutes(subHour, diffInMinutes);
    const diffInSeconds = differenceInSeconds(subMinute, now);

    return { diffInSeconds, diffInMinutes, diffInHours, diffInDays };
  }, []);

  const getCWLTime = useCallback((): IEventTime => {
    const now = new Date(); // 获取当前时间

    let CWLTime: Date;

    const nowDay = now.getDate();
    const nowHours = now.getHours();

    if ((nowDay === 11 && nowHours < 16) || nowDay < 11) {
      CWLTime = now;
    } else {
      CWLTime = addMonths(now, 1);
    }

    if ((nowDay <= 1 && nowHours < 16) || (nowDay === 11 && nowHours >= 16) || nowDay > 11) {
      CWLTime = set(startOfDay(CWLTime), {
        date: 1,
        hours: 16,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    } else {
      CWLTime = set(startOfDay(CWLTime), {
        date: 11,
        hours: 16,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    }

    return {
      active:
        ((nowDay === 1 && nowHours >= 16) || nowDay > 1) &&
        (nowDay < 11 || (nowDay === 11 && nowHours < 16)),
      time: diffToNow(CWLTime, now),
    };
  }, [diffToNow]);

  const getRaidWeekend = useCallback(() => {
    // 获取当前日期和时间
    const now = new Date();

    // 获取当前是星期几，date-fns 中的 getDay 返回的是 0（星期天）到 6（星期六）的数字
    const nowWeekDay = getDay(now);
    // 获取当前的小时数
    const nowHours = now.getHours();

    // 计算距离下一个Raid的开始时间，规定在星期五下午3点开始，星期一下午3点结束
    let raidWeekendTime;
    if (nowWeekDay < 5 || (nowWeekDay === 5 && nowHours < 15)) {
      // 如果今天是星期四或更早，或者是星期五但还没到下午3点，Raid在本周五开始
      raidWeekendTime = setHours(
        setMinutes(setSeconds(setMilliseconds(addDays(now, 5 - nowWeekDay), 0), 0), 0),
        15,
      );
    } else {
      // 否则，下一次Raid是下周一开始
      raidWeekendTime = setHours(
        setMinutes(setSeconds(setMilliseconds(addWeeks(addDays(now, 8 - nowWeekDay), 1), 0), 0), 0),
        15,
      );
    }

    return {
      active:
        (nowWeekDay <= 1 && nowHours < 15) ||
        nowWeekDay > 5 ||
        (nowWeekDay === 5 && nowHours >= 15),
      time: diffToNow(raidWeekendTime, now),
    };
  }, [diffToNow]);

  const getTraderRefresh = useCallback(() => {
    // 获取当前日期和时间
    const now = new Date(); // date-fns 使用原生的 Date 对象

    // 获取当前是星期几，date-fns 中的 getDay 返回的是 0（星期天）到 6（星期六）的数字
    const nowWeekDay = getDay(now) + 1; // +1 使其从1（星期天）到7（星期六）
    // 获取当前的小时数
    const nowHours = getHours(now);

    // 计算交易员刷新时间，根据条件选择当前周或下一周的星期二下午4点
    let traderRefreshTime;
    if (nowWeekDay < 2 || (nowWeekDay === 2 && nowHours < 16)) {
      // 如果今天是星期一或者是星期二但还没到下午4点，交易员刷新于本周星期二
      traderRefreshTime = setDay(now, 2, { weekStartsOn: 1 });
    } else {
      // 否则，交易员在下周星期二刷新
      traderRefreshTime = addWeeks(setDay(now, 2, { weekStartsOn: 1 }), 1);
    }

    // 设置具体的时间为下午4点整
    traderRefreshTime = setHours(
      setMinutes(setSeconds(setMilliseconds(traderRefreshTime, 0), 0), 0),
      16,
    );

    return {
      active: true,
      time: diffToNow(traderRefreshTime, now),
    };
  }, [diffToNow]);

  const getLeagueReset = useCallback(() => {
    // 获取当前的Date对象
    const now = new Date();

    // 获取本月的最后一天，并将其设置为开始于周一的一周的起点
    let lastMondayOfMonth = startOfWeek(endOfMonth(now), { weekStartsOn: 1 });
    // 设置为下午1点整
    lastMondayOfMonth = setHours(
      setMinutes(setSeconds(setMilliseconds(lastMondayOfMonth, 0), 0), 0),
      13,
    );

    // 如果当前时间已经超过了这个最后一个星期一的1点，就计算下个月的最后一个星期一的1点
    if (isAfter(now, lastMondayOfMonth)) {
      lastMondayOfMonth = startOfWeek(endOfMonth(addMonths(now, 1)), { weekStartsOn: 1 });
      lastMondayOfMonth = setHours(
        setMinutes(setSeconds(setMilliseconds(lastMondayOfMonth, 0), 0), 0),
        13,
      );
    }

    // 无论是否调整到下个月，最后一步是设置为下午1点
    const leagueResetTime = setHours(
      setMinutes(setSeconds(setMilliseconds(lastMondayOfMonth, 0), 0), 0),
      13,
    );

    return {
      active: true,
      time: diffToNow(leagueResetTime, now),
    };
  }, [diffToNow]);

  const getClanGames = useCallback(() => {
    const now = new Date();
    const nowDay = getDate(now); // 注意 Luxon 的 "day" 对应 date-fns 的 getDate()
    const nowHours = getHours(now);

    // 如果当前日期是 28 号下午 4 点或之后，则增加一个月，否则保持当前月份
    const nextOrCurrentMonth =
      nowDay > 28 || (nowDay === 28 && nowHours >= 16) ? addMonths(now, 1) : now;

    // 如果当前日期在 22 号下午 4 点或之后，则游戏时间设置为 28 号下午 4 点；否则设置为 22 号下午 4 点
    const clanGamesDay = nowDay > 22 || (nowDay === 22 && nowHours >= 16) ? 28 : 22;

    // 将 clanGamesTime 设置为目标月份的起始日，再根据 clanGamesDay 调整日期和时间
    const clanGamesTime = set(startOfMonth(nextOrCurrentMonth), {
      date: clanGamesDay,
      hours: 16,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    return {
      active:
        (nowDay > 22 || (nowDay === 22 && nowHours >= 16)) &&
        (nowDay < 28 || (nowDay === 28 && nowHours < 16)),
      time: diffToNow(clanGamesTime, now),
    };
  }, [diffToNow]);

  const getGoldPass = useCallback(() => {
    const now = new Date();
    const nowDay = getDate(now);
    const nowHours = getHours(now);

    let goldPassDate;
    if (nowDay <= 1 && nowHours < 16) {
      // If it's the first of the month and before 4 PM, set the date for this month
      goldPassDate = now;
    } else {
      // Otherwise, move to the next month
      goldPassDate = addMonths(now, 1);
    }

    // Set the gold pass time to the first day of the target month at 4 PM
    goldPassDate = startOfMonth(goldPassDate);
    goldPassDate = setHours(goldPassDate, 16);
    goldPassDate = setMinutes(goldPassDate, 0);
    goldPassDate = setSeconds(goldPassDate, 0);
    goldPassDate = setMilliseconds(goldPassDate, 0);

    return {
      active: true,
      time: diffToNow(goldPassDate, now),
    };
  }, [diffToNow]);

  return {
    getCWLTime,
    getGoldPass,
    getClanGames,
    getLeagueReset,
    getRaidWeekend,
    getTraderRefresh,
  };
};
