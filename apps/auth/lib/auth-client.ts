import { customSessionClient, oidcClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "@/lib/auth";
import { checkHeaderClient } from "@/lib/auth-plugins/client";

console.log("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL);

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_API_BASE_URL,
  plugins: [customSessionClient<typeof auth>(), checkHeaderClient(), oidcClient()],
});
