import { z } from "zod";

import { PointSchema } from "@/components/gobang/types/board.type";
import { EPiece } from "@/components/gobang/types/role.type";

export enum EWorkerAction {
  START = "Start",
  PLAY = "Play",
  UNDO = "Undo",
  END = "End",
}

export const ResponseSchema = z.object({
  action: z.enum(EWorkerAction),
  payload: z.object({
    // board: z.enum(EPiece).array().array(),
    winner: z.enum(EPiece).optional(),
    currentPlayer: z.enum(EPiece),
    // history: z.object({ x: z.number(), y: z.number(), role: z.enum(EPiece) }).array(),
    size: z.number(),
    score: z.number().optional(),
    bestPath: PointSchema.array().optional(),
    move: PointSchema.optional(),
  }),
});

export const StartSchema = z.object({
  action: z.literal(EWorkerAction.START),
  payload: z.object({
    depth: z.number().multipleOf(2),
    first: z.boolean(),
  }),
});

export type StartType = z.infer<typeof StartSchema>;

export const PlaySchema = z.object({
  action: z.literal(EWorkerAction.PLAY),
  payload: z.object({
    position: PointSchema,
  }),
});

export type PlayType = z.infer<typeof PlaySchema>;

export const UndoSchema = z.object({
  action: z.literal(EWorkerAction.UNDO),
});

export type UndoType = z.infer<typeof UndoSchema>;

export const EndSchema = z.object({
  action: z.literal(EWorkerAction.END),
});

export type EndType = z.infer<typeof EndSchema>;

export type EventType = StartType | PlayType | UndoType | EndType;
export type EventResType = z.infer<typeof ResponseSchema>;
