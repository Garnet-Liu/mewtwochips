import { config } from "@repo/eslint-config/next-js";

const eslintConfig =  [
  ...config,
  {
    files: [
      "src/graphql/gql.ts",
      "src/graphql/schema/types.generated.ts",
    ],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
