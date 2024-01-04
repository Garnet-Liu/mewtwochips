import { InMemoryLRUCache, KeyValueCache } from "@apollo/utils.keyvaluecache";
import { doc, Firestore, getDoc } from "@firebase/firestore";

import { TCurrentUser } from "@/gql/graphql";
import { firestore } from "@/context/firebaseClient";

export class FirebaseDataSource {
  private readonly store: Firestore;
  private readonly cache: KeyValueCache;

  constructor({ cache }: { cache?: KeyValueCache }) {
    this.store = firestore;
    this.cache = cache ?? new InMemoryLRUCache();
  }

  async getCurrentUser(id: string): Promise<TCurrentUser> {
    const c = await this.cache.get("");
    // return { clanTracker: [{ tag: "tag1" }] };

    const docRef = doc(this.store, "users", id);
    const querySnapshot = await getDoc(docRef);

    console.log("querySnapshot", querySnapshot.data());

    if (c) {
      return c as TCurrentUser;
    } else {
      return { clanTracker: [{ tag: "tag1" }] };
    }
  }

  async load(key: string) {
    return;
  }
}
