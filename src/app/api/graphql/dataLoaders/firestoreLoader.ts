import { InMemoryLRUCache, KeyValueCache } from "@apollo/utils.keyvaluecache";
import { FirebaseError, firestore } from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { GraphQLError } from "graphql/error";
import { User } from "firebase/auth";

import { FgRed, Reset } from "@/context/nodeColor";
import { CurrentUser, Maybe } from "@/gql/graphql";
import { adminFirestore } from "@/context/firebase/server";
import { COSDataSource } from "@/app/api/graphql/dataLoaders/cocLoader";

export class FirebaseDataSource {
  private readonly store: firestore.Firestore;
  private readonly cache: KeyValueCache;

  constructor({ cache }: { cache?: KeyValueCache }) {
    this.store = adminFirestore();
    this.cache = cache ?? new InMemoryLRUCache();
  }

  async getCurrentUser(user: Maybe<User>): Promise<CurrentUser> {
    if (user?.uid) {
      const userDocRef = this.store.collection("users").doc(user.uid);
      const queryUserSnapshot = await userDocRef.get();
      if (!queryUserSnapshot.exists) {
        console.log(`${FgRed}No such document!${Reset}`);
        return {};
      } else {
        return queryUserSnapshot.data()!;
      }
    } else {
      return {};
    }
  }

  async addVillage(coc: COSDataSource, tag: string, user: Maybe<User>) {
    if (user?.uid) {
      try {
        const userDocRef = this.store.collection("users").doc(user.uid);
        const docSnapshot = await userDocRef.get();
        const player = await coc.getPlayer(tag);
        if (docSnapshot.exists) {
          await userDocRef.update({
            villageTracker: FieldValue.arrayUnion(player),
          });
        } else {
          await userDocRef.set({ villageTracker: [player] });
        }
        return this.getCurrentUser(user);
      } catch (e) {
        const error = e as FirebaseError;
        console.log("error", error);
      }
    } else {
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
  }
}
