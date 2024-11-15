import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        id: { type: "text" },
        name: { type: "text" },
        email: { type: "text" },
        image: { type: "text" },
        idToken: { type: "text" },
        emailVerified: { type: "text" },
      },
      authorize: async (credentials) => {
        console.log("authorize idToken", credentials.idToken);
        if (credentials.idToken) {
          return {
            id: credentials.id as string,
            name: credentials.name as string,
            email: credentials.email as string,
            image: credentials.image as string,
            idToken: credentials.idToken,
            emailVerified: credentials.emailVerified,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        console.log("update new session ======>", !!session);
        token.idToken = session.idToken;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          idToken: token.idToken,
          emailVerified: token.emailVerified,
        },
      };
    },
  },
} satisfies NextAuthConfig;
