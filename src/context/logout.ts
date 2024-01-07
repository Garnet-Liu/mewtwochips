"use server";

import { signOut } from "@/context/nextAuth";

export const handleLogout = async () => {
  return await signOut();
};
