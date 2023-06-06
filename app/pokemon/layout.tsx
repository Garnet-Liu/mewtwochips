import { ReactNode } from "react";

import AuthProvider from "@/providers/auth-provider";
import { EAuthState } from "@/interfaces/auth.interface";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthProvider intercept={[{ state: EAuthState.LOGOUT, redirect: "/auth/login" }]}>{children}</AuthProvider>;
}
