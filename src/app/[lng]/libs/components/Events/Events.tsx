"use client";

import { ILanguage } from "@/types/globals";
import { useEventTime } from "@/app/[lng]/libs";
import { EventItem } from "./EventItem/EventItem";
import { useTranslation } from "@/app/i18n/client";

interface Props extends ILanguage {}

export function Events(props: Props) {
  const { lng } = props;
  const {
    getCWLTime,
    getGoldPass,
    getClanGames,
    getLeagueReset,
    getRaidWeekend,
    getTraderRefresh,
  } = useEventTime();
  const { t } = useTranslation(lng);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <EventItem
        t={t}
        getCurrentDate={getCWLTime}
        name={{ active: t("event.event-cwl-active"), inactive: t("event.event-cwl-inactive") }}
      />
      <EventItem
        t={t}
        getCurrentDate={getRaidWeekend}
        name={{
          active: t("event.event-raid-weekend-active"),
          inactive: t("event.event-raid-weekend-inactive"),
        }}
      />
      <EventItem t={t} getCurrentDate={getTraderRefresh} name={t("event.event-trader-refresh")} />
      <EventItem
        t={t}
        getCurrentDate={getClanGames}
        name={{
          active: t("event.event-clash-game-active"),
          inactive: t("event.event-clash-game-inactive"),
        }}
      />
      <EventItem
        t={t}
        getCurrentDate={getLeagueReset}
        name={t("event.event-league-reset-inactive")}
      />
      <EventItem t={t} getCurrentDate={getGoldPass} name={t("event.event-gold-pass-inactive")} />
    </div>
  );
}
