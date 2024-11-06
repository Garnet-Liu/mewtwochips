import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/next-auth/auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  return NextResponse.next({
    headers: { "x-origin": req.nextUrl.origin },
  });
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
