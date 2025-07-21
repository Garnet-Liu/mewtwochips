"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

type CounterState = {
  count: number;
};

type CounterActions = {
  init: () => void;
  decrement: () => void;
  increment: () => void;
  incrementByAmount: (by: number) => void;
};

const CounterStoreContext = createContext<StoreApi<CounterState & CounterActions> | null>(null);

type Props = {
  children: ReactNode;
  initialBears?: CounterState;
};

export const CounterStoreProvider = ({ children, initialBears }: Props) => {
  const [store] = useState(() =>
    createStore<CounterState & CounterActions>()(
      immer((set) => ({
        count: 0,
        ...initialBears,
        init: () =>
          set((s) => {
            s.count = 0;
          }),
        decrement: () =>
          set((s) => {
            s.count--;
          }),
        increment: () =>
          set((s) => {
            s.count++;
          }),
        incrementByAmount: (by) =>
          set((state) => {
            state.count += by;
          }),
      })),
    ),
  );

  return <CounterStoreContext.Provider value={store}>{children}</CounterStoreContext.Provider>;
};

export function useCounterStore<T>(selector: (state: CounterState & CounterActions) => T): T {
  const store = useContext(CounterStoreContext);
  if (!store) {
    throw new Error("Missing CounterStoreProvider");
  }
  return useStore(store, selector);
}
