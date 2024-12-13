import { Element } from "domhandler";
import * as cheerio from "cheerio";

import { baseFetchText } from "@/lib/fetch-request";

export const loadTable = async () => {
  const baseUrl =
    "https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E6%B4%97%E7%BF%A0%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";
  return baseFetchText(baseUrl).then((res) => {
    const $ = cheerio.load(res);

    const trList: Element[] = [];

    $("#mw-content-text > div.mw-parser-output > table:nth-child(10) > tbody > tr").each(
      (i, element) => {
        if (i > 0) {
          trList.push(element);
        }
      },
    );

    $("#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr").each(
      (i, element) => {
        if (i > 0) {
          trList.push(element);
        }
      },
    );

    $("#mw-content-text > div.mw-parser-output > table:nth-child(14) > tbody > tr").each(
      (i, element) => {
        if (i > 0) {
          trList.push(element);
        }
      },
    );

    $("#mw-content-text > div.mw-parser-output > table:nth-child(16) > tbody > tr").each(
      (i, element) => {
        if (i > 0) {
          trList.push(element);
        }
      },
    );

    $("#mw-content-text > div.mw-parser-output > table:nth-child(18) > tbody > tr").each(
      (i, element) => {
        if (i > 0) {
          trList.push(element);
        }
      },
    );

    console.log("trList length", trList.length);

    const pokemons: Array<{ count: number; name: string; index: number }> = [];

    trList.forEach((e) => {
      pokemons.push({
        index: Number($("td:nth-child(2)", e).text().replace("#", "").trim()),
        count: Number($("td:nth-child(1)", e).text().replace("#", "").trim()),
        name: $("td:nth-child(4)", e).text().replace("#", "").trim(),
      });
    });

    return pokemons.sort((f, s) => {
      return f.index - s.index;
    });
  });
};
