// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
//
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log("request", request);
//   return NextResponse.redirect(new URL("/auth/login", request.url));
// }
//
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/',
// };

import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log('cookies', request.cookies.getAll());
}
