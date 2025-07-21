import { UserAuthForm } from "@/components/auth/user-auth-form";

export default async function LoginPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <UserAuthForm />
    </div>
  );
}
