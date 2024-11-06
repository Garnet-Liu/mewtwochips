import { type FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { env } from "@/env";

const firebaseConfig: FirebaseOptions = {
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
