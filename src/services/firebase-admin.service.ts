import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";

export const firebaseAdmin = getApps()[0] ?? initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PRIVATE_KEY,
  }),
  databaseURL: "https://my-test-project-a8766-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const auth = getAuth();

export const db = getDatabase()
