// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

import { firebaseConfig } from "@/context/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_CLIENT_NAME = "FIREBASE_CLIENT_MEWTWOCHIPS";

export const clientApp = () => {
  // Initialize Firebase
  const app = getApps().find((a) => a.name === FIREBASE_CLIENT_NAME);
  if (app) {
    return app;
  } else {
    return initializeApp(firebaseConfig);
  }
};

export const clientAuth = () => {
  return getAuth(clientApp());
};
