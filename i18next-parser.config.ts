import { defaultNS, languages } from "@/libs/i18n/settings";

const i18nextParserConfig = {
  defaultNamespace: defaultNS,
  keySeparator: ".",
  locales: languages,
  output: "src/libs/i18n/locales/$LOCALE/$NAMESPACE.json",
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  verbose: true,
  // createOldCatalogs: false,
  // failOnWarnings: true,
};

export default i18nextParserConfig;
