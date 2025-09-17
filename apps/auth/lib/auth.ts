import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, customSession, jwt, openAPI } from "better-auth/plugins";

import { authPrisma } from "@/lib/auth-prisma";

const customSessionPlugin = customSession(
  async ({ user, session }) => {
    console.log("================= customSession after =================");
    return { user, session: { ...session, role: "USER" } };
  },
  {},
  { shouldMutateListDeviceSessionsEndpoint: true },
);

type AuthPlugins = [
  ReturnType<typeof openAPI>,
  ReturnType<typeof bearer>,
  ReturnType<typeof jwt>,
  typeof customSessionPlugin,
];

const authPlugins: AuthPlugins = [openAPI(), bearer(), jwt(), customSessionPlugin];

const authConfig = {
  trustedOrigins: (process.env.BETTER_TRUSTED_ORIGINS ?? "").split(",").filter(Boolean),
  database: prismaAdapter(authPrisma, { provider: "sqlite" }),
  plugins: authPlugins,
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.BETTER_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_GITHUB_CLIENT_SECRET as string,
    },
    google: {
      enabled: true,
      clientId: process.env.BETTER_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookiePrefix: "mewtwochips-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig) as ReturnType<typeof betterAuth<typeof authConfig>>;
