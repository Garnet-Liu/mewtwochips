import * as cheerio from "cheerio";
import https from "https";

import { Defense } from "@/gql/graphql";
import { cannon } from "@/app/api/coc/web-crawler/crawler-function/defenses/cannon";
import { defense } from "@/app/api/coc/web-crawler/crawler-function/defenses/defense";

export const defenseList = async () => {
  return new Promise((resolve) => {
    const baseUrl = "https://clashofclans.fandom.com";

    https.get(`${baseUrl}/wiki/Defensive_Buildings/Home_Village`, (res) => {
      // 分段返回的 自己拼接
      let html = "";
      // 有数据产生的时候 拼接
      res.on("data", (chunk) => {
        html += chunk;
      });

      res.on("end", () => {
        const $ = cheerio.load(html);
        const defenseLoad: Array<Promise<Defense>> = [];
        $("div.flexbox-display.bold-text.hovernav>div>div>a").each((i, element) => {
          // const names = ["Air Defense"];
          const name = $(element).text();
          const filename = name.toLowerCase().replace(" ", "_");

          switch (filename) {
            case "cannon":
            case "archer_tower":
            case "mortar":
            case "air_defense":
            case "wizard_tower":
            case "air_sweeper":
            case "hidden_tesla":
            case "bomb_tower":
            case "x-bow":
            case "inferno_tower":
            case "eagle_artillery":
            case "scattershot":
            case "builder's_hut":
            case "spell_tower":
            case "monolith":
            case "multi-archer_tower":
            case "ricochet_cannon":
            case "giga_tesla":
            case "giga_inferno (th13)":
            case "giga_inferno (th14)":
            case "giga_inferno (th15)":
              // case "giga_inferno (th16)":
              defenseLoad.push(defense(`${baseUrl}${$(element).attr("href")}`, name, cannon));
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
