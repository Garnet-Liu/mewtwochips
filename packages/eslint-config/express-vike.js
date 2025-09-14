import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import tsEslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/**
 * A shared ESLint configuration for the repository.
 * */
export const expressVikeConfig = defineConfig([
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  {
    files: [
      "components/**/*.{ts,tsx}",
      "layouts/**/*.{ts,tsx}",
      "pages/**/*.{ts,tsx}",
      "lib/**/*.{ts,tsx}",
      "auth/client.{ts,tsx}"
    ],
    extends: [
      js.configs.recommended,
      tsEslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite
    ],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-expressions": "error", // 使用 ESLint 原生的
      "prettier/prettier": "error",
      "react-refresh/only-export-components": "off",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"]
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always"
        }
      ]
    }
  },
  {
    files: ["server/**/*.{js,mjs,cjs,ts,mts,cts}", "auth/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, prettier: prettierPlugin, import: importPlugin },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-expressions": "error", // 使用 ESLint 原生的
      "prettier/prettier": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"]
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always"
        }
      ]
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }
  },
  {
    files: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  {
    ignores: ["dist/**", "coverage/**"]
  }
]);
