import { arrayMove } from "@dnd-kit/sortable";
import { type PropsWithChildren, useState } from "react";
import { createStore } from "zustand";

import { type OIDCClient, type OIDCClientState, OIDCClientStoreContext } from "./context";

import type { OIDCClientApp } from "@/components/oidc-client/oidc-client-table";

const createDataIds = (data?: Array<OIDCClientApp>) => {
  return (data ?? []).map(({ id }) => id);
};

const OIDCClientStoreProvider = ({
  children,
  data,
}: PropsWithChildren<Partial<OIDCClientState>>) => {
  const [store] = useState(() =>
    createStore<OIDCClient>((set) => ({
      data: data ?? [],
      dataIds: createDataIds(data),
      actions: {
        setData: (a, o) =>
          set(({ data, dataIds }) => {
            const oldIndex = dataIds.indexOf(a);
            const newIndex = dataIds.indexOf(o);
            const newData = arrayMove(data, oldIndex, newIndex);
            return { data: newData, dataIds: createDataIds(newData) };
          }),
      },
    })),
  );

  return (
    <OIDCClientStoreContext.Provider value={store}>{children}</OIDCClientStoreContext.Provider>
  );
};

export { OIDCClientStoreProvider };
