import { auth, FirebaseError } from "firebase-admin";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

import { Maybe } from "@/types/maybe";
import { firebaseAdmin } from "@/firebase/firebase-admin";

type VerifyCallback = (decoded: auth.DecodedIdToken) => Response | Promise<Response>;

export const verifyIdToken = async (auth: Maybe<Session>, callback: VerifyCallback) => {
  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(auth?.user.idToken ?? "");

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
