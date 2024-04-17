import { Defense } from "@/gql/graphql";
import * as cheerio from "cheerio";

import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";
import { formatStringNumber } from "@/app/api/coc/web-crawler/crawler-function/setUpKeyValue";

export class TrapsAnalyzingData extends AnalyzingData {
  constructor($: cheerio.CheerioAPI, data: Defense) {
    super($, data);
  }

  protected searchBuildingImage() {
    const checkImage = ["Giant Bomb", "Air Bomb", "Seeking Air Mine", "Skeleton Trap"];
    if (checkImage.includes(this.data.name ?? "")) {
      this.createImageGiantBomb();
    } else {
      this.createImageBomb();
    }
  }

  private createImageBomb() {
    this.$("table").each((i, element) => {
      if (i === 0) {
        this.$("tr", element).each((i, element) => {
          if (i === 0) {
            this.$("td", element).each((i, element) => {
              this.setLevelNormal(element, i);
            });
          } else {
            this.$("td", element).each((i, element) => {
              const levelString = this.$(element).text().replace("Level", "").trim();
              const levels = this.createLevelKey(levelString);
              levels.forEach((level, index) => {
                if (index > 0) {
                  this.data.level?.splice(level - 1, 0, { ...this.data.level[levels[0] - 1] });
                }
              });
            });
          }
        });
      }
    });
  }

  private createImageGiantBomb() {
    this.$("div.flexbox-display").each((i, element) => {
      if (i === 0) {
        this.$(">div", element).each((i, element) => {
          const levelName = this.$(element).text();
          const levels = this.createLevelKey(levelName.replace("Level", "").trim());
          if (levelName.includes("Level")) {
            levels.forEach((level) => {
              this.setLevelNormal(element, level - 1);
            });
          }
        });
      }
    });
  }

  private createLevelKey(levelString: string) {
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
