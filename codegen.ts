import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/api/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "src/apollo/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
