import { auth, FirebaseError } from "firebase-admin";
import { NextResponse } from "next/server";

import { firebaseAdmin } from "@/libs/firebase/firebase-admin";
import { firebaseServerIdToken } from "@/libs/firebase/firebase-server";

type VerifyCallback = (decoded: auth.DecodedIdToken) => Response | Promise<Response>;

export const verifyIdToken = async (callback: VerifyCallback) => {
  try {
    const { idToken } = await firebaseServerIdToken();

    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken ?? "");

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
