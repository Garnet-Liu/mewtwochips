"use client";

import { useShallow } from "zustand/react/shallow";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EPiece } from "@/types/gobang/role.type";
import { useGobangStore } from "@/components/gobang/gobang-store";

interface IProps {
  player: EPiece;
  loading: boolean;
}

export function ControlActionsConcede(props: IProps) {
  const { player, loading } = props;

  const { endGame } = useGobangStore(
    useShallow((s) => {
      return { endGame: s.endGame };
    }),
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={player === EPiece.EMPTY || loading}>
        <Button type="button">Concede</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={endGame}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
