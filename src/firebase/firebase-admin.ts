import admin from "firebase-admin";

import { env } from "@/env";

export const firebaseAppOptions: admin.AppOptions = {
  credential: admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: Buffer.from(env.FIREBASE_PRIVATE_KEY, "base64").toString("utf-8"),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
};

export const firebaseAdmin = admin.apps[0] ?? admin.initializeApp(firebaseAppOptions);
