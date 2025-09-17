import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import { base } from "./base";

/**
 * A shared ESLint configuration for the repository.
 * */
export const config = defineConfig([
  ...base,
  {
    files: [
      "components/**/*.{ts,tsx}",
      "layouts/**/*.{ts,tsx}",
      "pages/**/*.{ts,tsx}",
      "lib/**/*.{ts,tsx}",
      "auth/client.{ts,tsx}",
    ],
    extends: [
      pluginReactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: { react: pluginReact },
    settings: { react: { version: "detect" } },
    languageOptions: { globals: globals.browser },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: [
      "server/**/*.{js,mjs,cjs,ts,mts,cts}",
      "auth/**/*.{js,mjs,cjs,ts,mts,cts}",
    ],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
    languageOptions: { globals: globals.jest },
  },
  { ignores: ["coverage/**"] },
]);
