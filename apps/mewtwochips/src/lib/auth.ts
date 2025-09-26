import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";

import { db } from "@/lib/auth-drizzle";
import * as schema from "@/lib/auth-schema";

console.log(process.env.BETTER_AUTH_URL);

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: { ...schema } }),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "mc-coc",
          clientId: "IbdXLMgaytXvrwVVjBWZFGBGDFsCsoGX",
          clientSecret: "QzIyOjJAbsEKvlPXypAZaoPASBJAnrKJ",
          scopes: ["openid", "email", "profile"],
          pkce: true,
          discoveryUrl: "http://localhost:6001/api/auth/.well-known/openid-configuration",
          mapProfileToUser: async (profile) => {
            console.log("profile", profile);
            return {
              image: profile.profile,
            };
          },
        },
      ],
    }),
  ],
  advanced: {
    cookiePrefix: "mewtwochips",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
