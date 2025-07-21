"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Point } from "@/types/gobang/board.type";
import { EPiece, EPlayer } from "@/types/gobang/role.type";
import { end, play, reversal, start, undo } from "@/services/gobang";

type GobangState = {
  first: EPlayer;
  player: EPiece;
  winner: EPiece;
  winPath: Point[];
  loading: boolean;
  board: [number, number, EPiece][];
};

type GobangActions = {
  endGame: () => Promise<void>;
  undoGame: () => Promise<void>;
  playGame: (x: number, y: number) => Promise<void>;
  startGame: (first: boolean, depth: number) => Promise<void>;
};

type GobangStore = GobangState & GobangActions;

const GobangStoreContext = createContext<StoreApi<GobangStore> | null>(null);

type Props = {
  children: ReactNode;
  initialGobang?: GobangState;
};

export const GobangStoreProvider = ({ children, initialGobang }: Props) => {
  const init = useMemo(() => {
    return {
      first: EPlayer.HUMAN,
      player: EPiece.EMPTY,
      winner: EPiece.EMPTY,
      loading: false,
      winPath: [],
      board: [],
      ...initialGobang,
    };
  }, [initialGobang]);

  const [store] = useState(() =>
    createStore<GobangStore>()(
      immer((set) => ({
        ...init,
        startGame: async (f, d) => {
          set((s) => (s.loading = true));

          try {
            const { move, currentPlayer } = await start(f, d);
            set((s) => {
              if (move) {
                s.board.push([move[0], move[1], reversal(currentPlayer)]);
              }
              s.loading = false;
            });
          } catch {
            set((s) => (s.loading = false));
          }
        },
        playGame: async (x, y) => {
          set((s) => (s.loading = true));

          try {
            await play([x, y]);
            set((s) => {
              s.board.push([x, y, s.player]);
              s.player = reversal(s.player);
              s.loading = false;
            });
          } catch {
            set((s) => (s.loading = false));
          }
        },
        undoGame: async () => {
          set((s) => (s.loading = true));

          try {
            await undo();
            set((s) => {
              s.board.pop();
              s.board.pop();
              s.loading = false;
            });
          } catch {
            set((s) => (s.loading = false));
          }
        },
        endGame: async () => {
          set((s) => (s.loading = true));

          try {
            await end();
            set(() => init);
          } catch {
            set((s) => (s.loading = false));
          }
        },
      })),
    ),
  );

  return <GobangStoreContext.Provider value={store}>{children}</GobangStoreContext.Provider>;
};

export function useGobangStore<T>(selector: (state: GobangStore) => T): T {
  const store = useContext(GobangStoreContext);
  if (!store) {
    throw new Error("Missing BearStoreProvider");
  }
  return useStore(store, selector);
}
