import { createContext } from "react";
import type { StoreApi } from "zustand";

interface SpaceGameState {
  ok: boolean;
}

interface SpaceGameActions {
  changeOk: () => void;
}

interface SpaceGame extends SpaceGameState {
  actions: SpaceGameActions;
}

const SpaceGameStoreContext = createContext<StoreApi<SpaceGame>>(null!);

export { SpaceGameStoreContext };
export type { SpaceGame, SpaceGameState };
