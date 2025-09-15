import {
  addDays,
  addMonths,
  differenceInMilliseconds,
  formatDuration,
  getDate,
  getDay,
  getHours,
  intervalToDuration,
  isBefore,
  lastDayOfMonth,
  set,
  startOfWeek,
} from "date-fns";

import { enUS } from "@/locale/enUS";

const ONE_DAY = 24 * 60 * 60 * 1000;

const getDisplayTime = (date: Date, diff: number) => {
  console.log("=======================");
  console.log("date", date);
  console.log("date", new Date(date.getTime() + diff));
  const duration = intervalToDuration({ start: date, end: new Date(date.getTime() + diff) });

  return formatDuration(duration, {
    format: diff < ONE_DAY ? ["hours", "minutes", "seconds"] : ["days", "hours", "minutes"],
    locale: enUS, // zhCN for Chinese
  });
};

export const EVENT_CONFIG = {
  RAIL_WEEKEND: {
    name: "Raid Weekend",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      let utcEight = set(utcNow, { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 });

      while (getDay(utcEight) !== 5 && getDay(utcEight) !== 1) {
        utcEight = addDays(utcEight, 1);
      }

      const isSevenHours = getHours(utcNow) < 7;
      const isFiveDay = getDay(utcEight) === 5;

      const friday = addDays(utcEight, isFiveDay ? 0 : isSevenHours ? -3 : 4);

      const monday = set(addDays(utcEight, isFiveDay ? 3 : isSevenHours ? 0 : 7), { hours: 7 });

      const timeInMs = utcNow.getTime();
      const inRange = timeInMs >= friday.getTime() && timeInMs < monday.getTime();

      const diff = differenceInMilliseconds(inRange ? monday : friday, utcNow);

      return { out: !inRange, time: getDisplayTime(utcNow, diff) };
    },
  },
  TRADER_REFRESH: {
    name: "Weekly Deals",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      let utcTwo = set(utcNow, { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 });

      while (getDay(utcTwo) !== 2) {
        utcTwo = addDays(utcTwo, 1);
      }

      const diff = differenceInMilliseconds(utcTwo, utcNow);

      return { out: false, time: getDisplayTime(utcNow, diff) };
    },
  },
  CWL: {
    name: "CWL",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      let utcOne = set(utcNow, { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 });

      while (getDate(utcOne) !== 1 && getDate(utcOne) !== 11) {
        utcOne = addDays(utcOne, 1);
      }

      const oneInMonth = getDate(utcOne) === 1 ? utcOne : addDays(utcOne, -10);
      const tenInMonth = getDate(utcOne) === 1 ? addDays(utcOne, 10) : utcOne;

      const timeInMs = utcNow.getTime();
      const inRange = timeInMs >= oneInMonth.getTime() && timeInMs < tenInMonth.getTime();

      const diff = differenceInMilliseconds(inRange ? tenInMonth : oneInMonth, utcNow);

      return { out: !inRange, time: getDisplayTime(utcNow, diff) };
    },
  },
  CLAN_GAMES: {
    name: "Clan Games",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      let utcEnd = set(utcNow, { date: 28, hours: 8, minutes: 0, seconds: 0, milliseconds: 0 });

      if (isBefore(utcNow, utcEnd)) {
        utcEnd = addMonths(utcEnd, 1);
      }

      const utcStart = addDays(utcEnd, -6);

      const timeInMs = utcNow.getTime();
      const inRange = timeInMs >= utcStart.getTime() && timeInMs < utcEnd.getTime();

      const diff = differenceInMilliseconds(inRange ? utcEnd : utcStart, utcNow);

      return { out: !inRange, time: getDisplayTime(utcNow, diff) };
    },
  },
  LEAGUE_END: {
    name: "League End",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      const thisMonthLastDay = lastDayOfMonth(utcNow);

      let monthMonday = startOfWeek(thisMonthLastDay, { weekStartsOn: 1 });

      if (!isBefore(utcNow, monthMonday)) {
        monthMonday = startOfWeek(lastDayOfMonth(addMonths(utcNow, 1)), { weekStartsOn: 1 });
      }

      const diff = differenceInMilliseconds(set(monthMonday, { hours: 5 }), utcNow);

      return { out: false, time: getDisplayTime(utcNow, diff) };
    },
  },
  GOLD_PASS: {
    name: "Gold Pass",
    event: (date: Date = new Date()) => {
      const utcNow = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

      const utcOne = addDays(
        set(lastDayOfMonth(utcNow), {
          hours: 8,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }),
        1,
      );

      const diff = differenceInMilliseconds(utcOne, utcNow);

      return { out: false, time: getDisplayTime(utcNow, diff) };
    },
  },
} as const;
