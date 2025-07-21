import * as cheerio from "cheerio";

import { sleep } from "@/common/sleep";
import { baseFetchJson, baseFetchText } from "@/common/fetch-request";

interface PlayerStatistics {
  dates: number[];
  donations: Array<number | null>;
}

export interface PlayerBase {
  tag: string;
  name: string;
}

export const loadTable = async () => {
  const baseUrl = "https://www.clashofstats.com/cn/clans/2QRVQC9YG/members/table";
  return baseFetchText(baseUrl).then((res) => {
    const players: PlayerBase[] = [];
    const $ = cheerio.load(res);
    $(".v-data-table__wrapper>table>tbody>tr").each((i, element) => {
      const selector = ".table__link.table__link--center .r-val__text>div";
      const player = $(selector, element).first().text().trim();
      const path = $(".table__link.table__link--center>a", element).attr("href") ?? "";

      const urlTag = path?.split("/")[3].split("-");
      const playerTag = urlTag[urlTag?.length - 1];

      players.push({ tag: playerTag, name: player });
    });

    return players;
  });
};

const statistics = "https://api.clashofstats.com/players/history/statistics";
const start = new Date(Date.UTC(2024, 10, 1)).getTime();
const max = 30;

export const loadDonations = async (tag: string) => {
  const statisticsUrl = `${statistics}?tags=${tag}&stats=donations&start=${start}&max=${max}`;
  await sleep(1000);
  return baseFetchJson<Record<string, PlayerStatistics>>(statisticsUrl).then((res) => {
    const donations = res[`#${tag}`].donations.filter((donation) => {
      return typeof donation === "number";
    }) as number[];
    return Math.max(...donations, 0);
  });
};
