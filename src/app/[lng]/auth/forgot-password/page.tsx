"use client";

import { Box, Button, Card, Flex, Heading, Link, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

interface FormInput {
  email: string;
}

export default function Page() {
  const { handleSubmit, register, formState } = useForm<FormInput>({
    mode: "onTouched",
  });

  const { errors } = formState;

  const handleForgotPassword = (values: FormInput) => {
    console.log("handleCreatAccount", values);
  };

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
      <Card size="4" className="w-[500px]">
        <Heading as="h3" size="6" trim="start" mb="5">
          Forgot Password
        </Heading>

        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <Box mb="5" className="relative">
            <Label>
              <Text as="div" size="2" weight="bold" mb="2">
                Email address
              </Text>

              <TextField.Input
                {...register("email", {
                  required: "邮箱是必填项",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "请输入一个正确的邮箱" },
                })}
                tabIndex={-1}
                placeholder="Enter your email"
              />

              <Text as="p" size="1" mt="1" color="red" className="absolute">
                {errors.email?.message}
              </Text>
            </Label>
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Button className="w-full" tabIndex={-1}>
              Send Forgot Password Email
            </Button>
          </Flex>

          <Text as="div" mt="4" size="3" align="center">
            Already have an account?{" "}
            <Link asChild>
              <NextLink href={"/auth/sign-in"}>Sign in</NextLink>
            </Link>
          </Text>
        </form>
      </Card>
    </main>
  );
}
