import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";

import { env } from "@/env";
import { authConfig } from "@/next-auth/auth.config";
import { firebaseAdmin } from "@/firebase/firebase-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  adapter: FirestoreAdapter(firebaseAdmin.firestore()),
  debug: env.NODE_ENV !== "production",
  ...authConfig,
});

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: env.AUTH_GOOGLE_ID,
//       clientSecret: env.AUTH_GOOGLE_SECRET
//     }),
//   ],
//   adapter: FirestoreAdapter(firebaseAdmin.firestore()),
//   debug: env.NODE_ENV !== "production"
// });
