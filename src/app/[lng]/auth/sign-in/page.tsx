import { Card, Heading } from "@radix-ui/themes";

import { signIn } from "@/context/nextAuth";
import { SignInForm } from "@/app/[lng]/auth/libs";

export default async function Page() {
  const handleSignIn = async (formData: FormData) => {
    "use server";
    await signIn("credentials", formData);
  };

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
      <Card size="4" className="w-[500px]">
        <Heading as="h3" size="6" trim="start" mb="5">
          Sign in to your account
        </Heading>

        <SignInForm callback={handleSignIn} />
      </Card>
    </main>
  );
}
