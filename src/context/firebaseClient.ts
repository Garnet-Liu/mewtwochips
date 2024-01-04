// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu68avCtVntq-Df-3y6hdB2eLVf8BAMIc",
  authDomain: "mewtwochips.firebaseapp.com",
  projectId: "mewtwochips",
  storageBucket: "mewtwochips.appspot.com",
  messagingSenderId: "780265960505",
  appId: "1:780265960505:web:513c864eb7c601408689e8",
  measurementId: "G-T2TKDTWJYP",
};

// Initialize Firebase
export const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const clientAuth = getAuth(app);

export const firestore = getFirestore();
