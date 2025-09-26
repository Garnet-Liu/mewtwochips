import { z } from "zod";

import { PointSchema } from "@/components/gobang/types/board.type";
import { EPiece } from "@/components/gobang/types/role.type";

export const CacheSchema = z.object({
  depth: z.number(),
  value: z.number(),
  move: PointSchema.optional(),
  role: z.enum(EPiece),
  path: PointSchema.array(),
  onlyThree: z.boolean(),
  onlyFour: z.boolean(),
});

export type CacheType = z.infer<typeof CacheSchema>;
