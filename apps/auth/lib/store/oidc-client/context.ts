import type { UniqueIdentifier } from "@dnd-kit/core";
import { createContext } from "react";
import type { StoreApi } from "zustand";

import type { OIDCClientApp } from "@/components/oidc-client/oidc-client-table";

interface OIDCClientState {
  data: Array<OIDCClientApp>;
  dataIds: Array<UniqueIdentifier>;
}

interface OIDCClientActions {
  setData: (active: UniqueIdentifier, over: UniqueIdentifier) => void;
}

interface OIDCClient extends OIDCClientState {
  actions: OIDCClientActions;
}

const OIDCClientStoreContext = createContext<StoreApi<OIDCClient>>(null!);

export { OIDCClientStoreContext };
export type { OIDCClient, OIDCClientState };
