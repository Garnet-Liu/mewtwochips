"use client";

import { createSelector } from "reselect";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux-store/store";
import { EPiece } from "@/types/gobang/role.type";
import { useAppSelector } from "@/redux-store/hooks";
import { ControlActions } from "@/components/gobang/control-actions";

export function Control() {
  const { player, winner, loading } = useAppSelector(
    createSelector([(s: RootState) => s.gobang], (gobang) => ({
      loading: gobang.loading,
      winner: gobang.winner,
      player: gobang.player,
    })),
  );

  const message = useMemo(() => {
    if (player === EPiece.BLACK) {
      return "Your move.";
    } else if (player === EPiece.WHITE) {
      return "The computer is thinking.";
    } else if (winner === EPiece.WHITE || winner === EPiece.BLACK) {
      return `${winner === EPiece.BLACK ? "Black" : "White"} is winner!!!`;
    } else {
      return "Please start the game.";
    }
  }, [player, winner]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("text-sm text-foreground", { "animate-pulse": loading })}>{message}</div>

      <ControlActions player={player} loading={loading} />
    </div>
  );
}
