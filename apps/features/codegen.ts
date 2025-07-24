import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/": {
      preset: "client",
      plugins: [],
    },
    // "src/graphql/schema.graphql": {
    //   plugins: ["schema-ast"],
    //   config: {
    //     includeDirectives: true,
    //   },
    // },
    "src/graphql/generated-resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write", "eslint --fix ./src/graphql/**/*.ts"] },
};

export default config;
