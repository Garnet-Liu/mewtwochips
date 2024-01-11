import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { FIREBASE_SESSION } from "@/context/constant";
import { adminAuth } from "@/context/firebase/server";

export async function GET() {
  const authorization = headers().get("Authorization");
  if (authorization) {
    const idToken = authorization.split("Bearer ")[1];
    //Generate session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn,
    });
    const options = {
      name: FIREBASE_SESSION,
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    //Add the cookie to the browser
    cookies().set(options);
    return NextResponse.json(
      {
        code: 200,
        message: "success",
        success: true,
        data: null,
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        code: 401,
        message: "UNAUTHENTICATED",
        success: false,
        data: null,
      },
      { status: 401 },
    );
  }
}
