import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { base } from "./base";

/**
 * A custom ESLint configuration for libraries that use React.
 */
export const config = defineConfig([
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    extends: [pluginReactHooks.configs["recommended-latest"]],
    plugins: { react: pluginReact },
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
