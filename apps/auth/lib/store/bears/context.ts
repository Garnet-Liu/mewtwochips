import { createContext } from "react";
import type { StoreApi } from "zustand";

interface BearsState {
  bears: number;
  columns: number;
}

interface BearsActions {
  removeAllBears: () => void;
  increasePopulation: (by: number) => void;
}

interface Bears extends BearsState {
  actions: BearsActions;
}

const BearsStoreContext = createContext<StoreApi<Bears>>(null!);

export { BearsStoreContext };
export type { Bears, BearsState };
