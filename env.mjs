// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NEXT_PUBLIC_LK_API_KEY:z.string().min(1),
    NEXT_PUBLIC_LK_API_SECRET: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_GOOGLE_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET: z.string().min(1)
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_LIVEKIT_WS_URL: z.string().min(1),
    NEXT_PUBLIC_STREAM_API_KEY: z.string().min(1),
    NEXT_PUBLIC_STREAM_API_SECRET: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_LK_API_KEY: process.env.NEXT_PUBLIC_LK_API_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_LK_API_SECRET: process.env.NEXT_PUBLIC_LK_API_SECRET,
    NEXT_PUBLIC_LIVEKIT_WS_URL: process.env.NEXT_PUBLIC_LIVEKIT_WS_URL,
    NEXT_PUBLIC_STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    NEXT_PUBLIC_STREAM_API_SECRET: process.env.NEXT_PUBLIC_STREAM_API_SECRET,
    NEXT_PUBLIC_FIREBASE_GOOGLE_ID: process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_ID,
    NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET: process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET
  }
});
