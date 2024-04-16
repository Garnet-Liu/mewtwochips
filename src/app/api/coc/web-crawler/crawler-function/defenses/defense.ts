import * as cheerio from "cheerio";
import https from "https";
import fs from "fs";

import { Defense } from "@/gql/graphql";

export const defense = async (
  url: string,
  name: string,
  callback: ($: cheerio.CheerioAPI, data: Defense) => Defense,
): Promise<Defense> => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log("start===============");
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

        callback($, data);

        const filename = name.toLowerCase().replace(" ", "_");

        fs.writeFile(
          `${process.cwd()}/src/app/api/coc/web-crawler/crawler-function/defenses/data/${filename}.json`,
          JSON.stringify(data),
          (err) => {
            if (!err) {
              console.log("文件写入完毕");
              resolve(data);
            } else {
              console.log("文件写入失败");
              console.log(err);
              resolve(data);
            }
          },
        );
      });
    });
  });
};
