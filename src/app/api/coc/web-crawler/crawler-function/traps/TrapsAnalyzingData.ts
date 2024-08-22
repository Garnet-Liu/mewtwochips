import * as cheerio from "cheerio";

import { Building } from "@/gql/graphql";
import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";

export class TrapsAnalyzingData extends AnalyzingData {
  constructor($: cheerio.CheerioAPI, data: Building) {
    super($, data);
  }

  protected searchBuildingImage() {
    const checkImage = ["Giant Bomb", "Air Bomb", "Seeking Air Mine", "Skeleton Trap"];
    if (checkImage.includes(this.data.name ?? "")) {
      super.searchBuildingImage();
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
}
