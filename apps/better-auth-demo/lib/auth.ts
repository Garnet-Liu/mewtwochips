import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  trustedOrigins: (process.env.BETTER_TRUSTED_ORIGINS ?? "").split(",").filter(Boolean),
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
  },
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
    cookiePrefix: "vuer-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
