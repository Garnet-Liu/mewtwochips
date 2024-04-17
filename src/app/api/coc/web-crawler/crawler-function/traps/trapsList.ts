import * as cheerio from "cheerio";
import https from "https";

import { Building } from "@/gql/graphql";
import { loadPage } from "@/app/api/coc/web-crawler/crawler-function/loadPage";
import { TrapsAnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/traps/TrapsAnalyzingData";

export const trapsList = async (url: string) => {
  return new Promise((resolve) => {
    https.get(`${url}/wiki/Traps/Home_Village`, (res) => {
      // 分段返回的 自己拼接
      let html = "";
      // 有数据产生的时候 拼接
      res.on("data", (chunk) => {
        html += chunk;
      });

      res.on("end", () => {
        const $ = cheerio.load(html);
        const defenseLoad: Array<Promise<Building>> = [];
        $("div.flexbox-display.bold-text.hovernav").each((i, element) => {
          if (i === 0) {
            $(">div>div:not([class='center'])>a", element).each((i, element) => {
              const name = $(element).text().trim();
              const filename = name.toLowerCase().replace(/ /g, "_");

              switch (filename) {
                case "bomb":
                case "spring_trap":
                case "giant_bomb":
                case "air_bomb":
                case "seeking_air_mine":
                case "skeleton_trap":
                case "tornado_trap":
                  defenseLoad.push(
                    loadPage(
                      `${url}${$(element).attr("href")}`,
                      name,
                      `${process.cwd()}/src/app/api/coc/web-crawler/crawler-function/traps/data`,
                      TrapsAnalyzingData,
                    ),
                  );
                  break;
                default:
                  console.log("default filename", filename);
                  break;
              }
            });
          }
        });

        Promise.allSettled(defenseLoad).then((result) => {
          resolve(result);
        });
      });
    });
  });
};
