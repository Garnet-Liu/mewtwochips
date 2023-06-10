"use client";

import { getAuth, signInWithPopup } from "@firebase/auth";

import { firebaseApp, provider } from "@/services/firebase-client.service";

export const LoginButton = () => {
  console.log("LoginButton");
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(getAuth(firebaseApp), provider);
      console.log("userCredential", userCredential);
    } catch (error) {
      console.log("LoginButton login error", error);
    }
  };

  return (
    <button className="px-4 py-2 shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400" onClick={handleLogin}>
      Sign in
    </button>
  );
};
