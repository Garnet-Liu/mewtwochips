import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import * as path from "path";

const typesArray = loadFilesSync(path.join(process.cwd(), "src/apollo/schemas/types"), {
  extensions: ["graphql"],
  recursive: true,
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = mergeTypeDefs(typesArray);
