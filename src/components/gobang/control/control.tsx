"use client";

import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";

import { cn } from "@/common/utils";
import { EPiece } from "@/types/gobang/role.type";
import { useGobangStore } from "@/components/gobang/gobang-store";
import { ControlActions } from "@/components/gobang/control-actions";

export function Control() {
  const { player, loading, winner } = useGobangStore(
    useShallow((s) => {
      return {
        loading: s.loading,
        winner: s.winner,
        player: s.player,
      };
    }),
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
