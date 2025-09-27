import { type PropsWithChildren, useState } from "react";
import { createStore } from "zustand";

import { type SpaceGame, type SpaceGameState, SpaceGameStoreContext } from "./context";

const SpaceGameStoreProvider = ({ children, ok }: PropsWithChildren<Partial<SpaceGameState>>) => {
  const [store] = useState(() =>
    createStore<SpaceGame>((set) => ({
      ok: ok ?? false,
      actions: {
        changeOk: () => set(() => ({ ok: false })),
      },
    })),
  );

  return <SpaceGameStoreContext.Provider value={store}>{children}</SpaceGameStoreContext.Provider>;
};

export { SpaceGameStoreProvider };
