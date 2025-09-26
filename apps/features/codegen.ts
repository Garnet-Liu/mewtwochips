import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // overwrite: true,
  schema: "**/schema.graphql",
  generates: {
    "src/graphql/": {
      preset: "client",
      documents: ["src/**/*.{ts,tsx}"],
      config: {
        useTypeImports: true,
      },
    },
    "src/graphql/schema": defineConfig({
      mergeSchema: false,
      typesPluginsConfig: {
        useTypeImports: true,
        contextType: "../context#MyContext",
      },
    }),
  },
  hooks: {
    afterAllFileWrite: [
      "sed -i '' -E '1{/\\/\\* eslint-disable \\*\\//d;}' src/graphql/*.ts",
      "eslint --fix",
    ],
  },
  // hooks: { afterAllFileWrite: ["bash ./eslint-retry.sh"] },
};

export default config;
