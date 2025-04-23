import { auth, FirebaseError } from "firebase-admin";
import { NextResponse } from "next/server";

import { firebaseAdmin } from "@/libs/firebase/firebase-admin";

type VerifyCallback = (decoded: auth.DecodedIdToken) => Response | Promise<Response>;

export const verifyIdToken = async (callback: VerifyCallback) => {
  try {
    const tokens = { token: "" };

    const decoded = await firebaseAdmin.auth().verifyIdToken(tokens?.token ?? "");

    console.log("<========= verifyIdToken decoded user", decoded.name);

    return await callback(decoded);
  } catch (e) {
    const error = e as FirebaseError;
    return NextResponse.json(
      {
        code: 401,
        success: false,
        message: "Unauthorized",
        data: error.toJSON(),
      },
      { status: 401 },
    );
  }
};
