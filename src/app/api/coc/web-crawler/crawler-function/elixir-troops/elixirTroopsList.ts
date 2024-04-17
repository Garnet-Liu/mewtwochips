import * as cheerio from "cheerio";
import https from "https";

import { Building } from "@/gql/graphql";
import { loadPage } from "@/app/api/coc/web-crawler/crawler-function/loadPage";
import { ElixirTroopsAnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/elixir-troops/ElixirTroopsAnalyzingData";

export const elixirTroopsList = async (url: string) => {
  return new Promise((resolve) => {
    https.get(`${url}/wiki/Elixir_Troops`, (res) => {
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
            case "barbarian":
            case "archer":
            case "giant":
            case "goblin":
            case "wall_breaker":
            case "balloon":
            case "wizard":
            case "healer":
            case "dragon":
            case "p.e.k.k.a":
            case "baby_dragon":
            case "miner":
            case "electro_dragon":
            case "yeti":
            case "dragon_rider":
            case "electro_titan":
            case "root_rider":
              defenseLoad.push(
                loadPage(
                  `${url}${$(element).attr("href")}`,
                  name,
                  `${process.cwd()}/src/app/api/coc/web-crawler/crawler-function/elixir-troops/data`,
                  ElixirTroopsAnalyzingData,
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
