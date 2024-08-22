import * as cheerio from "cheerio";

import { Building } from "@/gql/graphql";
import {
  createLevelKey,
  formatStringNumber,
  setLevelCost,
  setLevelExperienceGained,
  setLevelHitpoints,
  setLevelLaboratoryLevelRequired,
  setLevelLevel,
  setLevelNormal,
  setLevelTime,
  setLevelTownHallLevelRequired,
} from "@/app/api/coc/web-crawler/crawler-function/setUpKeyValue";

export class AnalyzingData {
  protected data: Building;
  protected $: cheerio.CheerioAPI;

  constructor($: cheerio.CheerioAPI, data: Building) {
    this.$ = $;
    this.data = data;
  }

  get isInfernoTower() {
    return this.data.name === "Inferno Tower";
  }

  buildBuildingData() {
    this.searchSize();
    this.searchBuildingCount();
    this.searchBuildingImage();
    this.searchBuildingLevel();
    return this.data;
  }

  // 查询建筑的大小
  protected searchSize() {
    this.$("table#building-size-table td").each((i, element) => {
      if (this.$(element).text().trim()) {
        const size = this.$(element).text().trim().split("x");
        this.data.size = {
          width: formatStringNumber(size[0]),
          height: formatStringNumber(size[1]),
        };
      }
    });
  }

  // 查询建筑的每个等级的数量
  protected searchBuildingCount() {
    this.$("table#number-available-table").each((i, element) => {
      const td = this.$("td:not([scope='row'])", element);

      td.each((i, element) => {
        if (this.data.count) {
          this.data.count[i] = formatStringNumber(this.$(element).text().replace(/\*/g, "").trim());
        } else {
          this.data.count = [];
          this.data.count[i] = formatStringNumber(this.$(element).text().trim());
        }
      });
    });
  }

  // 查询建筑的每个等级的图片
  protected searchBuildingImage() {
    this.$("div.flexbox-display").each((i, element) => {
      if (i === 0) {
        this.$(">div", element).each((i, element) => {
          const text = this.$(element).text().trim();
          const levels = this.createLevelKey(text.replace("Level", "").trim());
          if (text.includes("Level")) {
            levels.forEach((level) => {
              this.setLevelNormal(element, level - 1);
            });
          }
        });
      }
    });
  }

  protected searchBuildingLevel() {
    this.$("div.stats-background table.wikitable").each((i, element) => {
      if (i === 0) {
        this.extractLevelData(element, i);
      }
    });
  }

  protected setLevelNormal(element: cheerio.Element, index: number): void {
    const src = this.$(element).find("img").attr("data-src");
    if (src?.includes("https://")) {
      setLevelNormal(this.data, src, index);
    } else {
      setLevelNormal(this.data, this.$(element).find("img").attr("src")!, index);
    }
  }

  protected extractLevelData(element: cheerio.Element, index: number): void {
    const nameKeys = createLevelKey();
    let costType: string = "";
    this.$("tr>th", element).each((i, element) => {
      const nameKey = nameKeys.find((k) => {
        return k.name.some((n) => n === this.$(element).text().trim());
      });
      if (nameKey) {
        nameKey.index = this.isInfernoTower ? (i > 0 ? i + 4 : i) : i;
      }

      if (nameKey?.key === "cost") {
        const title = this.$("img", element).attr("alt")?.trim();
        console.log("title", title);
        costType = title === "Gold" ? "gold" : title === "Elixir" ? "elixir" : "darkElixir";
      }
    });

    this.$("tr", element).each((level, element) => {
      const count = this.isInfernoTower ? 2 : 1;
      if (level > (this.isInfernoTower ? 1 : 0)) {
        this.$("td", element).each((i, element) => {
          const nameKey = nameKeys.find((k) => k.index === i);
          switch (nameKey?.key) {
            case "level":
              setLevelLevel(this.data, this.$(element).text().trim(), level - count);
              break;
            case "hitpoints":
              setLevelHitpoints(this.data, this.$(element).text().trim(), level - count);
              break;
            case "cost":
              setLevelCost(this.data, this.$(element).text().trim(), level - count, costType);
              break;
            case "time":
              setLevelTime(this.data, this.$(element).text().trim(), level - count);
              break;
            case "experienceGained":
              setLevelExperienceGained(this.data, this.$(element).text().trim(), level - count);
              break;
            case "townHallLevelRequired":
              setLevelTownHallLevelRequired(
                this.data,
                this.$(element).text().trim(),
                level - count,
              );
              break;
            case "laboratoryLevelRequired":
              setLevelLaboratoryLevelRequired(
                this.data,
                this.$(element).text().trim(),
                level - count,
              );
              break;
            default:
              // console.log("set cannon value default....", $(element).text().trim());
              break;
          }
        });
      }
    });
  }

  protected createLevelKey(levelString: string) {
    if (levelString.indexOf("&") !== -1) {
      return levelString.split("&").map((level) => {
        return formatStringNumber(level.trim());
      });
    } else if (levelString.indexOf("-") !== -1) {
      const levels = levelString.split("-").map((level) => {
        return formatStringNumber(level.trim());
      });
      return Array.from({ length: levels[1] - levels[0] + 1 }, (_, i) => levels[0] + i);
    } else {
      return [formatStringNumber(levelString)];
    }
  }
}
