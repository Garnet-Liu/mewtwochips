import { FirebaseOptions } from "firebase/app";

import { env } from "@/env";

export const firebaseConfig: FirebaseOptions = {
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
