import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://flyby-router-demo.herokuapp.com/",
  documents: ["./**/*.tsx", "./**/*.ts"],
  generates: {
    "artifacts/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
