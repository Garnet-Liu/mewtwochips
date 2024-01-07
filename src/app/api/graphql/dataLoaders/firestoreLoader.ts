import { InMemoryLRUCache, KeyValueCache } from "@apollo/utils.keyvaluecache";
import { doc, Firestore, getDoc } from "@firebase/firestore";
import { GraphQLError } from "graphql/error";
import { Session } from "next-auth";

import { Maybe, TCurrentUser } from "@/gql/graphql";
import { clientAuth, firestore } from "@/context/firebaseClient";

export class FirebaseDataSource {
  private readonly store: Firestore;
  private readonly cache: KeyValueCache;

  constructor({ cache }: { cache?: KeyValueCache }) {
    this.store = firestore;
    this.cache = cache ?? new InMemoryLRUCache();
  }

  async getCurrentUser(session: Maybe<Session>): Promise<TCurrentUser> {
    console.log(session);
    console.log("\x1b[34m", "clientAuth => currentUser => uid", clientAuth.currentUser?.uid, "\n");
    if (clientAuth.currentUser) {
      const docRef = doc(this.store, "users", clientAuth.currentUser.uid);
      const querySnapshot = await getDoc(docRef);
      const user = querySnapshot.data();
      if (user) {
        return user;
      } else {
        return {};
      }
    } else {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
  }

  async load(key: string) {
    return;
  }
}
