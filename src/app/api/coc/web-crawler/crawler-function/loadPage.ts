import * as cheerio from "cheerio";
import https from "https";
import fs from "fs";

import { Defense } from "@/gql/graphql";
import { AnalyzingData } from "@/app/api/coc/web-crawler/crawler-function/AnalyzingData";

export const loadPage = async (
  url: string,
  name: string,
  writePath: string,
  callback: typeof AnalyzingData,
): Promise<Defense> => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log("start===============", url, name);
      // 分段返回的 自己拼接
      let html = "";
      // 有数据产生的时候 拼接
      res.on("data", (chunk) => {
        html += chunk;
      });
      // 拼接完成
      res.on("end", () => {
        const $ = cheerio.load(html);

        const data: Defense = { name: name, level: [], count: [] };

        const analyzing = new callback($, data);
        const analyzingData = analyzing.buildBuildingData();

        const filename = name.toLowerCase().replace(/ /g, "_");

        fs.writeFile(`${writePath}/${filename}.json`, JSON.stringify(analyzingData), (err) => {
          if (!err) {
            console.log("文件写入完毕");
            resolve(analyzingData);
          } else {
            console.log("文件写入失败");
            console.log(err);
            resolve(analyzingData);
          }
        });
      });
    });
  });
};
