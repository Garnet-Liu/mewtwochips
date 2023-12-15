// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    LIVE_KIT_API_KEY: z.string().min(1),
    STREAM_API_SECRET: z.string().min(1),
    FIREBASE_GOOGLE_ID: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    LIVE_KIT_API_SECRET: z.string().min(1),
    FIREBASE_PRIVATE_KEY: z.string().min(1),
    FIREBASE_CLIENT_EMAIL: z.string().min(1),
    FIREBASE_GOOGLE_SECRET: z.string().min(1),
    CLASH_OF_CLANS_API_TOKEN: z.string().min(1),
    NEXT_PUBLIC_STREAM_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"])
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
    NODE_ENV: z.enum(["development", "test", "production"])
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    LIVE_KIT_API_KEY: process.env.LIVE_KIT_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    FIREBASE_GOOGLE_ID: process.env.FIREBASE_GOOGLE_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    LIVE_KIT_API_SECRET: process.env.LIVE_KIT_API_SECRET,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_GOOGLE_SECRET: process.env.FIREBASE_GOOGLE_SECRET,
    CLASH_OF_CLANS_API_TOKEN: process.env.CLASH_OF_CLANS_API_TOKEN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_LIVEKIT_WS_URL: process.env.NEXT_PUBLIC_LIVEKIT_WS_URL,
    NEXT_PUBLIC_STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY
  }
});
