import { ReactNode } from "react";

import AuthProvider from "@/providers/auth.provider";
import { EAuthState } from "@/interfaces/auth.interface";

export const metadata = {
  title: "Photos"
};

export default function ChildLayout({ children }: { children: ReactNode }) {
  console.log("Photo Layout");
  return (
    <AuthProvider intercept={[{ state: EAuthState.LOGOUT, redirect: "/auth/login" }]}>
      <div className="relative m-auto w-[1200px]">{children}</div>
    </AuthProvider>
  );
}
