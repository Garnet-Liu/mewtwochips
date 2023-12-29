import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface User extends User {
    firebaseToken?: string;
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  // interface Session {
  //   user: {
  //     /** The user's postal address. */
  //     firebaseToken: string
  //     // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
  //   } & DefaultSession["user"] // To keep the default types
  // }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
