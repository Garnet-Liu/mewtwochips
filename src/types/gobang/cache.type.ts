import { z } from "zod";

import { EPiece, PointSchema } from "@/types/gobang";

export const CacheSchema = z.object({
  depth: z.number(),
  value: z.number(),
  move: PointSchema.optional(),
  role: z.nativeEnum(EPiece),
  path: PointSchema.array(),
  onlyThree: z.boolean(),
  onlyFour: z.boolean(),
});

export type CacheType = z.infer<typeof CacheSchema>;
