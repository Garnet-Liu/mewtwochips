import { useContext } from "react";
import { useStore } from "zustand";

import { type OIDCClient, OIDCClientStoreContext } from "@/lib/store/oidc-client/context";

function useOIDCClientStore<U = OIDCClient>(selector: (s: OIDCClient) => U) {
  const store = useContext(OIDCClientStoreContext);
  if (!store) {
    throw new Error("Missing OIDCClientStoreProvider");
  }
  return useStore(store, selector);
}

export { useOIDCClientStore };
