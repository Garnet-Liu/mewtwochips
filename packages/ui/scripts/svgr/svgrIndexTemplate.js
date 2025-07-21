// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const path = require("path");

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
    .filter((value, index, array) => {
      return array.indexOf(value) === index;
    })
    .forEach((fileName) => {
      const importName = pathToPascalCase(fileName);
      const exportName = pathToKebabCase(fileName);
      imports += `import ${importName} from './${exportName}/${removeNamedSyntax(exportName)}';\n`;
      exports += removeNamedSyntax(importName) + ",\n";
    });

  return `${imports} \n export {${exports}}`;
}

function readExistingImports(existingIndexFile) {
  // eslint-disable-next-line no-undef
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

function pathToPascalCase(fileName) {
  return fileName
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : "")) // 去掉分隔符，并将分隔符后的字母大写
    .replace(/^(.)/, (char) => char.toUpperCase()); // 确保第一个字母大写
}

function pathToKebabCase(fileName) {
  return fileName
    .replace(/([a-z])([A-Z])/g, "$1-$2") // 在小写和大写字母之间加上 "-"
    .replace(/\s+/g, "-") // 将空格替换为 "-"
    .replace(/_/g, "-") // 将下划线替换为 "-"
    .toLowerCase(); // 转换为小写
}

function removeNamedSyntax(input) {
  return input.replace("{", "").replace("}", "").trim();
}

// eslint-disable-next-line no-undef
module.exports = defaultIndexTemplate;
