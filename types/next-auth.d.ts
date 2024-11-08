import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      idToken?: string;
      emailVerified?: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    uid: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    idExp: number;
    emailVerified: boolean;
  }
}
