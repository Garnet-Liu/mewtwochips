import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth/types" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface Session extends DefaultSession {
    /** OpenID ID Token */
    user: { token?: JWT } & DefaultSession["user"];
  }
}
