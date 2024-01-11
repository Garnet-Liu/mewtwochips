import { graphql } from "@/gql";

export const MutationAddVillage = graphql(`
  mutation mutationAddVillage($tag: String!) {
    addVillage(tag: $tag) {
      villageTracker {
        tag
      }
    }
  }
`);
