import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "@firebase/auth";
// import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthConfig } from "next-auth";

import { env } from "../../env.mjs";
// import { firestore } from "@/context/firebaseAdmin";
import { clientAuth } from "@/context/firebaseClient";

export const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        const userCredential = await signInWithEmailAndPassword(
          clientAuth,
          credentials.email as string,
          credentials.password as string,
        );

        console.log("userCredential uid", userCredential.user.uid);

        return {
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          image: userCredential.user.photoURL,
          emailVerified: userCredential.user.emailVerified,
        };
      },
    }),
    GoogleProvider,
  ],
  // adapter: FirestoreAdapter({ firestore, namingStrategy: "snake_case" }),
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const path = pathname.split("/");
      path.splice(1, 1);
      const isAuthPath = path.join("/").startsWith("/auth");
      console.log("authorized isAuthPath", isAuthPath);
      if (isAuthPath) {
        return !auth;
      }
      return true;
    },
    async session(params) {
      const { token, session } = params;
      if (token && session.user) {
        session.user.token = token;
      }
      return session;
    },
  },
  debug: env.NODE_ENV !== "production",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
