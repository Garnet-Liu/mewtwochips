import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";

import { FIREBASE_SESSION } from "@/context/constant";
import { cookieName, fallbackLng, languages } from "@/context/i18nSettings";

acceptLanguage.languages(languages);

const getLanguage = (req: NextRequest) => {
  if (req.cookies.has(cookieName)) {
    return acceptLanguage.get(req.cookies.get(cookieName)?.value);
  } else {
    return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
  }
};

const signInAfterBank = ["/tracker"];
const signInBeforeBank = ["/auth"];

const authPageCheck = async (req: NextRequest) => {
  if (req.method === "GET") {
    const session = req.cookies.get(FIREBASE_SESSION)?.value;

    const path = req.nextUrl.pathname.split("/");
    path.splice(1, 1);
    const basePath = path.join("/");
    console.log("authPageCheck", !!session);
    if (session) {
      return signInBeforeBank.some((p) => basePath.startsWith(p)) && "/";
    } else {
      return signInAfterBank.some((p) => basePath.startsWith(p)) && "/auth/sign-in";
    }
  }
};

export const middleware = async (req: NextRequest) => {
  const lng = getLanguage(req);

  const redirectPath = await authPageCheck(req);

  if (redirectPath) {
    console.log("auth redirect path", redirectPath);
    return NextResponse.redirect(new URL(`/${lng}${redirectPath}`, req.url));
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer")!);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) {
      NextResponse.next().cookies.set(cookieName, lngInReferer);
    }
  }

  return NextResponse.next();
};

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
