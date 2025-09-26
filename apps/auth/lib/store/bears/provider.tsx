import { type PropsWithChildren, useState } from "react";
import { createStore } from "zustand";

import { type Bears, type BearsState, BearsStoreContext } from "./context";

const BearsStoreProvider = ({
  children,
  ...initialBears
}: PropsWithChildren<Partial<BearsState>>) => {
  const [store] = useState(() =>
    createStore<Bears>((set) => ({
      bears: 0,
      columns: 0,
      ...initialBears,
      actions: {
        increasePopulation: (by: number) => set((state) => ({ bears: state.bears + by })),
        removeAllBears: () => set({ bears: 0 }),
      },
    })),
  );

  return <BearsStoreContext.Provider value={store}>{children}</BearsStoreContext.Provider>;
};

export { BearsStoreProvider };
