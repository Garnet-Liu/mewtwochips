import { genericOAuthClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "@/lib/auth";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  plugins: [genericOAuthClient(), inferAdditionalFields<typeof auth>()],
});

type Session = typeof authClient.$Infer.Session;

export const { signIn, signOut, useSession } = authClient;
export type { Session };
