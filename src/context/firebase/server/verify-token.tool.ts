import { DecodedIdToken } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { adminAuth } from "@/context/firebase/server/firebaseAdmin";

export const verifyTokenTool = async <T>(
  callback: (d: DecodedIdToken) => NextResponse<T> | Promise<NextResponse<T>>,
) => {
  const idToken = cookies().get("token");
  try {
    const decodedIdToken = await adminAuth().verifyIdToken(idToken?.value || "");
    console.log("decodedIdToken", decodedIdToken);
    return callback(decodedIdToken);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { code: 400, success: false, message: "token invalid" },
      { status: 400 },
    );
  }
};
