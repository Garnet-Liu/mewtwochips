"use server";

import { cookies } from "next/headers";

import { FIREBASE_SESSION } from "@/context/constant";

export const handleLogout = async () => {
  const options = { name: FIREBASE_SESSION, value: "", maxAge: -1 };
  cookies().set(options);
};
