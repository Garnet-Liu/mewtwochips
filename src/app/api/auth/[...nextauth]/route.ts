import NextAuth from "next-auth";

import { nextAuth } from "@/context/next-auth";

const handler = NextAuth(nextAuth);

export { handler as GET, handler as POST };
