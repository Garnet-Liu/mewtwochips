import { signInWithCustomToken } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { cookies } from "next/headers";

import { firebaseConfig } from "@/context/firebase";
import { FIREBASE_SESSION } from "@/context/constant";
import { adminAuth } from "@/context/firebase/server";

export const getCurrentUser = async () => {
  const { getAuth } = await import("firebase/auth");

  const noSessionReturn = { app: null, currentUser: null };

  const session = getSessionCookie();

  if (!session) return noSessionReturn;

  const decodedIdToken = await adminAuth().verifySessionCookie(session);

  const app = initializeAuthenticatedApp(decodedIdToken.uid);
  const auth = getAuth(app);

  // handle revoked tokens
  const isRevoked = !(await adminAuth().verifySessionCookie(session, true));

  if (isRevoked) return noSessionReturn;

  // authenticate with custom token
  if (auth.currentUser?.uid !== decodedIdToken.uid) {
    const customToken = await adminAuth().createCustomToken(decodedIdToken.uid);

    if (!customToken) return noSessionReturn;

    await signInWithCustomToken(auth, customToken);
  }

  return { app, currentUser: auth.currentUser };
};

export const getSessionCookie = () => {
  try {
    return cookies().get(FIREBASE_SESSION)?.value;
  } catch (e) {
    return undefined;
  }
};

const initializeAuthenticatedApp = (uid: string) => {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;

  return initializeApp(firebaseConfig, appName);
};
