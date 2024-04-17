import * as cheerio from "cheerio";
import https from "https";

import { Building } from "@/gql/graphql";
import { loadPage } from "@/app/api/coc/web-crawler/crawler-function/loadPage";
import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";

export const resourceList = async (url: string) => {
  return new Promise((resolve) => {
    https.get(`${url}/wiki/Resource_Buildings/Home_Village`, (res) => {
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
            case "town_hall":
            case "gold_mine":
            case "elixir_collector":
            case "gold_storage":
            case "elixir_storage":
            case "dark_elixir_drill":
            case "dark_elixir_storage":
            case "clan_castle":
              defenseLoad.push(
                loadPage(
                  `${url}${$(element).attr("href")}`,
                  name,
                  `${process.cwd()}/src/app/api/coc/web-crawler/crawler-function/resource/data`,
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
