"use client";

import { getAuth, signInWithPopup } from "@firebase/auth";

import { firebaseApp, provider } from "@/services/firebase.service";

export const LoginButton = () => {
  console.log("LoginButton");
  const handleLogin = () => {
    signInWithPopup(getAuth(firebaseApp), provider).then((user) => {
      console.log("user", user);
    });
  };

  return (
    <button className="px-4 py-2 shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400" onClick={handleLogin}>
      Sign in
    </button>
  );
};
