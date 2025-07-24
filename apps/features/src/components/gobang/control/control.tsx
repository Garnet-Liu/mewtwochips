"use client";

import { cn } from "@repo/ui/lib/utils";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { ControlActions } from "@/components/gobang/control-actions";
import { useGobangStore } from "@/components/gobang/gobang-store";
import { EPiece } from "@/components/gobang/types/role.type";

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
      <div className={cn("text-foreground text-sm", { "animate-pulse": loading })}>{message}</div>

      <ControlActions player={player} loading={loading} />
    </div>
  );
}
