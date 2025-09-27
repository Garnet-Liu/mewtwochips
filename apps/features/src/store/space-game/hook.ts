import { useContext } from "react";
import { useStore } from "zustand";

import { type SpaceGame, SpaceGameStoreContext } from "./context";

function useSpaceGameStore<U = SpaceGame>(selector: (s: SpaceGame) => U) {
  const store = useContext(SpaceGameStoreContext);
  if (!store) {
    throw new Error("Missing SpaceGameStoreContext");
  }
  return useStore(store, selector);
}

export { useSpaceGameStore };
