// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
