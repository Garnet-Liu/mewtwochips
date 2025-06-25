"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type Counter = {
  count: number;
  actions: {
    init: () => void;
    decrement: () => void;
    increment: () => void;
    incrementByAmount: (by: number) => void;
  };
};

const CounterStoreContext = createContext<StoreApi<Counter> | null>(null);

type Props = {
  children: ReactNode;
  initialBears?: number;
};

export const CounterStoreProvider = ({ children, initialBears }: Props) => {
  const [store] = useState(() =>
    createStore<Counter>((set) => ({
      count: initialBears ?? 0,
      actions: {
        init: () => set({ count: 0 }),
        decrement: () => set(({ count }) => ({ count: count-- })),
        increment: () => set(({ count }) => ({ count: count++ })),
        incrementByAmount: (by: number) => {
          return set((state) => {
            return { count: state.count + by };
          });
        },
      },
    })),
  );

  return <CounterStoreContext.Provider value={store}>{children}</CounterStoreContext.Provider>;
};

export function useCounterStore<T>(selector: (state: Counter) => T): T {
  const store = useContext(CounterStoreContext);
  if (!store) {
    throw new Error("Missing BearStoreProvider");
  }
  return useStore(store, selector);
}
