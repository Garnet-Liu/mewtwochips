import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { cert } from "firebase-admin/app";

import { env } from "../../env.mjs";

export const nextAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_FIREBASE_GOOGLE_ID,
      clientSecret: env.NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    namingStrategy: "snake_case",
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  debug: env.NODE_ENV !== "production",
};
