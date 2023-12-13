import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import { env } from "../../env.mjs";

export const nextAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_FIREBASE_GOOGLE_ID,
      clientSecret: env.NEXT_PUBLIC_FIREBASE_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
