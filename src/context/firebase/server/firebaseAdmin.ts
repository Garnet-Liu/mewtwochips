import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import { env } from "../../../../env.mjs";

const FIREBASE_NAME = "FIREBASE_ADMIN_MEWTWOCHIPS";

export function adminApp() {
  const currentApp = getApps().find((a) => a.name === FIREBASE_NAME);
  if (currentApp) {
    return currentApp;
  } else {
    return initializeApp(
      {
        credential: cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY,
        }),
        databaseURL:
          "https://my-test-project-a8766-default-rtdb.asia-southeast1.firebasedatabase.app",
      },
      FIREBASE_NAME,
    );
  }
}

export function adminAuth() {
  return getAuth(adminApp());
}

export function adminFirestore() {
  return getFirestore(adminApp());
}

// export const firebaseAdmin = getApps()[0] ?? initializeApp();
//
// export const adminAuth = getAuth(firebaseAdmin);
//
// export const db = getDatabase();
