"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { type MouseEvent, useCallback, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGobangStore } from "@/components/gobang/gobang-store";
import { EPiece } from "@/components/gobang/types/role.type";

interface IProps {
  player: EPiece;
  loading: boolean;
}

export function ControlActionsWithdraw(props: IProps) {
  const { player, loading } = props;

  const [open, setOpen] = useState(false);

  const { board, undoGame } = useGobangStore(
    useShallow((s) => {
      return { board: s.board, undoGame: s.undoGame };
    }),
  );

  console.log({ board, player });

  const withdrawHandle = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await undoGame();
      setOpen(false);
    },
    [undoGame],
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={player === EPiece.EMPTY || !board.length || loading}>
        <Button type="button">Withdraw</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you withdraw?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={withdrawHandle}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
