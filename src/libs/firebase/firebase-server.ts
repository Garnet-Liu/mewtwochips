// Initialize an instance of `FirebaseServerApp`.
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com
import { initializeServerApp } from "@firebase/app";

import { firebaseConfig } from "@/libs/firebase/configs";

export const firebaseServerApp = (idToken: string) => {
  return initializeServerApp(firebaseConfig, { authIdToken: idToken });
};
