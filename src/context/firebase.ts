import { initFirestore } from "@auth/firebase-adapter";
import { cert, getApps, initializeApp } from "firebase-admin/app";

import { env } from "../../env.mjs";

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: "https://my-test-project-a8766-default-rtdb.asia-southeast1.firebasedatabase.app",
  });

export const firestore = initFirestore({
  credential: cert({
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
  }),
});
