const path = require("path");
const fs = require("fs");

const locationOfSvgComponentsInProject = "../../src/components/Svgs/index.ts";

function readExistingImports(existingIndexFile) {
  const filePath = path.join(__dirname, existingIndexFile);

  if (!fs.existsSync(filePath)) {
    console.info("There is no existing index.ts file: " + existingIndexFile);
    return [];
  }

  const data = fs.readFileSync(filePath, "utf8");

  const regex = /(?:import\s+)(.*)(?:\s+from)/gm;
  const matches = data.match(regex);

  const importsArray = matches.map((match) =>
    match.replace(/(?:import\s+)(.*)(?:\s+from)/, "$1").trim(),
  );
  // .map((item) => item.replace("{", "").replace("}", "").trim());

  return importsArray;
}

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
      imports += `import ${exportName} from './${removeNamedSyntax(exportName)}';\n`;
      exports += removeNamedSyntax(exportName) + ",\n";
    });

  return `${imports} \n export {${exports}}`;
}

function getExportNameFromPath(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
  return exportName;
}

function removeNamedSyntax(input) {
  return input.replace("{", "").replace("}", "").trim();
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

module.exports = defaultIndexTemplate;
