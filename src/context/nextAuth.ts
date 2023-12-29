import { GoogleAuthProvider, signInWithCredential } from "@firebase/auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

import { env } from "../../env.mjs";
import { clientAuth } from "@/context/firebaseClient";
import { adminAuth, firestore } from "@/context/firebaseAdmin";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.FIREBASE_GOOGLE_ID,
      clientSecret: env.FIREBASE_GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({ firestore, namingStrategy: "snake_case" }),
  callbacks: {
    async signIn(params) {
      const { account } = params;
      return !!account?.id_token;
    },
    async jwt(params) {
      const { token, account } = params;
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log("=================== jwt ===================");
      // console.log("==============> jwt user", user);
      // console.log("==============> jwt token", token);
      // console.log("==============> jwt trigger", trigger);
      // console.log("==============> jwt profile", profile);
      // console.log("==============> jwt account", account);
      if (account?.id_token) {
        token.id_token = account.id_token;
        token.uid = account.uid;
      }

      if (!clientAuth.currentUser && token.id_token) {
        const credential = GoogleAuthProvider.credential(token.id_token as string);
        await signInWithCredential(clientAuth, credential);
      }

      return token;
    },
    async session({ session }) {
      // console.log("=================== session ===================");
      // console.log("==============> session user", user);
      // console.log("==============> session token", token);
      // console.log("==============> session session", session);
      // console.log("currentUser", !!auth.currentUser);
      // console.log("currentUser uid", auth.currentUser?.uid);
      if (session.user && clientAuth.currentUser?.uid) {
        session.user.firebaseToken = await adminAuth.createCustomToken(clientAuth.currentUser.uid);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: env.NODE_ENV !== "production",
  // debug: false,
});
