import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { Session } from "next-auth";

import { Maybe } from "@/gql/graphql";
import { auth } from "@/context/nextAuth";
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

const authPageCheck = (req: NextRequest, auth: Maybe<Session>) => {
  const path = req.nextUrl.pathname.split("/");
  path.splice(1, 1);
  const basePath = path.join("/");
  if (auth) {
    return signInBeforeBank.some((p) => basePath.startsWith(p)) && "/";
  } else {
    return signInAfterBank.some((p) => basePath.startsWith(p)) && "/auth/sign-in";
  }
};

export const middleware = auth((req) => {
  const lng = getLanguage(req);

  const path = authPageCheck(req, req.auth);

  if (path) {
    return NextResponse.redirect(new URL(`/${lng}${path}`, req.url));
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
});

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
