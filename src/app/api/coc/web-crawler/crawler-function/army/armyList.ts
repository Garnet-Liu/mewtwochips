import * as cheerio from "cheerio";
import https from "https";

import { Building } from "@/gql/graphql";
import { loadPage } from "@/app/api/coc/web-crawler/crawler-function/loadPage";
import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";

export const armyList = async (url: string) => {
  return new Promise((resolve) => {
    https.get(`${url}/wiki/Army_Buildings/Home_Village`, (res) => {
      // 分段返回的 自己拼接
      let html = "";
      // 有数据产生的时候 拼接
      res.on("data", (chunk) => {
        html += chunk;
      });

      res.on("end", () => {
        const $ = cheerio.load(html);
        const defenseLoad: Array<Promise<Building>> = [];
        $("div.flexbox-display.bold-text.hovernav>div>div>a").each((i, element) => {
          const name = $(element).text().trim();
          const filename = name.toLowerCase().replace(/ /g, "_");

          switch (filename) {
            case "army_camp":
            case "barracks":
            case "dark_barracks":
            case "laboratory":
            case "spell_factory":
            case "dark_spell_factory":
            case "blacksmith":
            case "workshop":
            case "pet_house":
              defenseLoad.push(
                loadPage(
                  `${url}${$(element).attr("href")}`,
                  name,
                  `${process.cwd()}/src/app/api/coc/web-crawler/crawler-function/army/data`,
                  AnalyzingData,
                ),
              );
              break;
            default:
              console.log("default filename", filename);
              break;
          }
        });

        Promise.allSettled(defenseLoad).then((result) => {
          resolve(result);
        });
      });
    });
  });
};
