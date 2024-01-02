import { readdirSync, readFileSync } from "fs";
import path from "path";

const folderPath = `${process.cwd()}/src/app/api/graphql/schemas`; // 文件夹路径

// 读取文件夹下所有文件名
const files = readdirSync(folderPath);

// 从文件夹下读取所有 .graphql 文件的内容
export const typeDefs = files
  .filter((file) => file.endsWith(".graphql")) // 过滤出 .graphql 文件
  .map((file) => {
    const filePath = path.join(folderPath, file); // 构建文件路径
    return readFileSync(filePath, "utf-8"); // 读取文件内容
  })
  .join("\n"); // 合并所有文件内容
