import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";

import { cookieName, fallbackLng, languages } from "@/context/i18nSettings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const lng = getLanguage(req);

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
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    } else {
      return response;
    }
  }

  return NextResponse.next();
}

const getLanguage = (req: NextRequest) => {
  if (req.cookies.has(cookieName)) {
    return acceptLanguage.get(req.cookies.get(cookieName)?.value);
  } else {
    console.log(req.headers.get("Accept-Language"));
    return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
  }
};
