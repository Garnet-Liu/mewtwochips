"use client";

import { Card, Heading } from "@radix-ui/themes";

import { ILanguageParams } from "@/types/globals";
import { ForgotPasswordForm } from "@/app/[lng]/auth/libs";

interface Props extends ILanguageParams {}

export default function Page(props: Props) {
  const { params } = props;

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
      <Card size="4" className="w-[500px]">
        <Heading as="h3" size="6" trim="start" mb="5">
          Forgot Password
        </Heading>

        <ForgotPasswordForm lng={params.lng} />
      </Card>
    </main>
  );
}
