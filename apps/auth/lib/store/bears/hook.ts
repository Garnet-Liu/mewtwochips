import { useContext } from "react";
import { useStore } from "zustand";

import { type Bears, BearsStoreContext } from "./context";

function useBearsStore<U = Bears>(selector: (s: Bears) => U) {
  const store = useContext(BearsStoreContext);
  if (!store) {
    throw new Error("Missing BearsStoreProvider");
  }
  return useStore(store, selector);
}

export { useBearsStore };
