import * as cheerio from "cheerio";

import { Building } from "@/gql/graphql";
import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";

export class ElixirTroopsAnalyzingData extends AnalyzingData {
  constructor($: cheerio.CheerioAPI, data: Building) {
    super($, data);
  }

  protected searchBuildingLevel() {
    this.$("div.stats-background table.wikitable").each((i, element) => {
      if (i === 2) {
        this.extractLevelData(element, i);
      }
    });
  }
}
