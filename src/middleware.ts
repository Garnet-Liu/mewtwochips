import { NextRequest } from "next/server";

import { i18nMiddleware } from "@/libs/i18n/i18n-middleware";

export async function middleware(req: NextRequest) {
  console.log("pathname", req.nextUrl.pathname);
  return i18nMiddleware(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|firebase-sw.js).*)",
  ],
};
