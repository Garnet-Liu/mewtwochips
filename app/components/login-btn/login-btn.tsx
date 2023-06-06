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
    <button
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
      onClick={handleLogin}>
      Sign in
    </button>
  );
};
