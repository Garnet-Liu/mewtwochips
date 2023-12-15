import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import { env } from "../../env.mjs";
import { firestore } from "@/context/firebase";

export const nextAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.FIREBASE_GOOGLE_ID,
      clientSecret: env.FIREBASE_GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({ firestore, namingStrategy: "snake_case" }),
  debug: env.NODE_ENV !== "production",
};
