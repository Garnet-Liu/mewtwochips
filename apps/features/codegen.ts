import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "**/schema.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/": {
      preset: "client",
      documents: ["src/**/*.{ts,tsx}"],
      config: { useTypeImports: true },
      presetConfig: { fragmentMasking: false },
      hooks: {
        beforeOneFileWrite: (path: string, content: string) => {
          return content.replace(/^\/\* eslint-disable \*\/\n?/, "");
        },
      },
    },
    "src/graphql/schema": defineConfig({
      mergeSchema: false,
      typesPluginsConfig: {
        useTypeImports: true,
        useIndexSignature: true,
        contextType: "../context#MyContext",
      },
    }),
  },
  hooks: {
    afterAllFileWrite: ["eslint --fix"],
  },
  // hooks: { afterAllFileWrite: ["bash ./eslint-retry.sh"] },
};

export default config;
