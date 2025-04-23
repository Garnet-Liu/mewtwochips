import { redirect } from "next/navigation";

import { auth } from "@/next-auth/auth";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export default async function LoginPage() {
  const session = await auth();

  if (!!session) {
    redirect("/");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <UserAuthForm />
    </div>
  );
}
