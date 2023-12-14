import { DecodedIdToken } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { auth } from "@/services/firebase-admin.service";

export const verifyTokenTool = async <T>(callback: (d: DecodedIdToken) => NextResponse<T> | Promise<NextResponse<T>>) => {
  const idToken = cookies().get("token");
  try {
    const decodedIdToken = await auth.verifyIdToken(idToken?.value || "");
    console.log("decodedIdToken", decodedIdToken);
    return callback(decodedIdToken);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ code: 400, success: false, message: "token inv alid" }, { status: 400 });
  }
};
