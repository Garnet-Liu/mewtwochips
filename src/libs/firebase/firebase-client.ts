import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from "@/libs/firebase/configs";

export const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
