const path = require("path");
const fs = require("fs");

const locationOfSvgComponentsInProject = "../../src/components/svgs/index.ts";

function defaultIndexTemplate(filePaths) {
  let imports = "";
  let exports = "";

  const existingImports = readExistingImports(locationOfSvgComponentsInProject);

  filePaths
    .map(({ path: filePath }) => {
      return getExportNameFromPath(filePath);
    })
    .concat(existingImports)
    .filter(onlyUnique)
    .forEach((exportName) => {
      const importName = exportName
        .replace(/[^a-zA-Z0-9]+/g, " ") // 替换非字母数字字符为空格
        .trim() // 去掉两端的空格
        .split(" ") // 按空格分割成数组
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 每个单词首字母大写
        .join("");
      console.log("importName", importName);
      console.log("exportName", exportName);
      console.log(
        `import ${importName} from './${exportName}/${removeNamedSyntax(exportName)}';\n`,
      );
      imports += `import ${importName} from './${exportName}/${removeNamedSyntax(exportName)}';\n`;
      exports += removeNamedSyntax(importName) + ",\n";
    });

  return `${imports} \n export {${exports}}`;
}

function readExistingImports(existingIndexFile) {
  const filePath = path.join(__dirname, existingIndexFile);

  if (!fs.existsSync(filePath)) {
    console.info("There is no existing index.ts file: " + existingIndexFile);
    return [];
  }

  const data = fs.readFileSync(filePath, "utf8");

  const regex = /import\s+(.*)\s+from/gm;
  const matches = data.match(regex) || [];

  return matches.map((match) => match.replace(/import\s+(.*)\s+from/, "$1").trim());
}

function getExportNameFromPath(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  return /^\d/.test(basename) ? `Svg${basename}` : basename;
}

function removeNamedSyntax(input) {
  return input.replace("{", "").replace("}", "").trim();
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

module.exports = defaultIndexTemplate;
