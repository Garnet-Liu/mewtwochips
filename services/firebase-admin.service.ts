import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = require("../firebase-secret-key.json");

export const firebaseAdmin = getApps()[0] ?? initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://my-test-project-a8766-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const auth = getAuth();

export const db = getDatabase()
