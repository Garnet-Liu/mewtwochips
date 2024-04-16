import { Defense } from "@/gql/graphql";
import * as cheerio from "cheerio";

import {
  createLevelKey,
  formatStringNumber,
  setLevelBuildCost,
  setLevelBuildTime,
  setLevelExperienceGained,
  setLevelHitpoints,
  setLevelLevel,
  setLevelNormal,
  setLevelTownHallLevelRequired,
} from "@/app/api/coc/web-crawler/crawler-function/setUpKeyValue";

export const cannon = ($: cheerio.CheerioAPI, data: Defense): Defense => {
  const isInfernoTower = data.name === "Inferno Tower";
  // 查询建筑的大小
  $("table#building-size-table td").each((i, element) => {
    if ($(element).text().trim()) {
      const size = $(element).text().trim().split("x");
      data.size = { width: formatStringNumber(size[0]), height: formatStringNumber(size[1]) };
    }
  });

  // 查询建筑的每个等级的数量
  $("table#number-available-table").each((i, element) => {
    const td = $("td:not([scope='row'])", element);

    td.each((i, element) => {
      if (data.count) {
        data.count[i] = formatStringNumber($(element).text().replace(/\*/g, "").trim());
      } else {
        data.count = [];
        data.count[i] = formatStringNumber($(element).text().trim());
      }
    });
  });

  // 查询建筑的每个等级的图片
  $("div.flexbox-display").each((i, element) => {
    if (i === 0) {
      $("img", element).each((i, element) => {
        const levelName = $("+div", element).text();
        if (levelName.includes("Level")) {
          const src = $(element).attr("data-src");
          const levelIndex = formatStringNumber(levelName.replace("Level ", "").trim()) - 1;
          if (src?.includes("https://")) {
            setLevelNormal(data, src, levelIndex);
          } else {
            setLevelNormal(data, $(element).attr("src")!, levelIndex);
          }
        }
      });
    }
  });

  // 查询建筑每个等级的各种属性
  $("table.wikitable").each((i, element) => {
    if (i === 0) {
      const nameKeys = createLevelKey();
      let costType: string = "";
      $("tr>th", element).each((i, element) => {
        const nameKey = nameKeys.find((k) => {
          return k.name.some((n) => n === $(element).text().trim());
        });
        if (nameKey) {
          nameKey.index = isInfernoTower ? (i > 0 ? i + 4 : i) : i;
        }

        if (nameKey?.key === "buildCost") {
          const title = $("img", element).attr("alt")?.trim();
          costType = title === "Gold" ? "gold" : title === "Elixir" ? "elixir" : "darkElixir";
        }
      });

      $("tr", element).each((level, element) => {
        const count = isInfernoTower ? 2 : 1;
        if (level > (isInfernoTower ? 1 : 0)) {
          $("td", element).each((i, element) => {
            const nameKey = nameKeys.find((k) => k.index === i);
            switch (nameKey?.key) {
              case "level":
                setLevelLevel(data, $(element).text().trim(), level - count);
                break;
              case "hitpoints":
                setLevelHitpoints(data, $(element).text().trim(), level - count);
                break;
              case "buildCost":
                setLevelBuildCost(data, $(element).text().trim(), level - count, costType);
                break;
              case "buildTime":
                setLevelBuildTime(data, $(element).text().trim(), level - count);
                break;
              case "experienceGained":
                setLevelExperienceGained(data, $(element).text().trim(), level - count);
                break;
              case "townHallLevelRequired":
                setLevelTownHallLevelRequired(data, $(element).text().trim(), level - count);
                break;
              default:
                // console.log("set cannon value default....", $(element).text().trim());
                break;
            }
          });
        }
      });
    }
  });

  return data;
};
