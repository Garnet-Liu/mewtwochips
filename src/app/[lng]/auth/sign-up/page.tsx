"use client";

import { Box, Button, Card, Flex, Heading, Link, Text, TextField } from "@radix-ui/themes";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useState } from "react";

import { clientAuth } from "@/context/firebaseClient";

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const { handleSubmit, register, formState } = useForm<FormInput>({
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { errors } = formState;

  const handleCreatAccount = async (values: FormInput) => {
    console.log("handleCreatAccount", values);
    const createRes = await createUserWithEmailAndPassword(
      clientAuth,
      values.email,
      values.password,
    );
    console.log("createRes", createRes);
    const res = await signIn("credentials", { ...values, redirect: false });
    console.log("res", res);
  };
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-center px-4">
      <Card size="4" className="w-[500px]">
        <Heading as="h3" size="6" trim="start" mb="5">
          Sign up
        </Heading>

        <form onSubmit={handleSubmit(handleCreatAccount)}>
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

          <Box mb="5" position="relative">
            <Label>
              <Text as="div" size="2" weight="bold" mb="2">
                Password
              </Text>

              <TextField.Root>
                <TextField.Input
                  {...register("password", {
                    required: "密码是必填的",
                    pattern: { value: /^.{8,}$/, message: "密码最少八位" },
                  })}
                  type={showPassword ? "text" : "password"}
                  tabIndex={-1}
                  placeholder="Enter your password"
                />

                <TextField.Slot onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <span className="material-symbols-outlined">visibility</span>
                  ) : (
                    <span className="material-symbols-outlined">visibility_off</span>
                  )}
                </TextField.Slot>
              </TextField.Root>

              <Text as="p" size="1" mt="1" color="red" className="absolute">
                {errors.password?.message}
              </Text>
            </Label>
          </Box>

          <Box mb="5" position="relative">
            <Label>
              <Text as="div" size="2" weight="bold" mb="2">
                Confirm password
              </Text>

              <TextField.Root>
                <TextField.Input
                  {...register("confirmPassword", {
                    required: "确认密码是必填的",
                    pattern: { value: /^.{8,}$/, message: "密码最少八位" },
                    validate: {
                      checkConfirm: (value, formValues) => {
                        return value === formValues.password || "两次密码输入不一致";
                      },
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  tabIndex={-1}
                  placeholder="Enter your password"
                />

                <TextField.Slot onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <span className="material-symbols-outlined">visibility</span>
                  ) : (
                    <span className="material-symbols-outlined">visibility_off</span>
                  )}
                </TextField.Slot>
              </TextField.Root>

              <Text as="p" size="1" mt="1" color="red" className="absolute">
                {errors.confirmPassword?.message}
              </Text>
            </Label>
          </Box>

          <Flex mt="4" justify="end" gap="3">
            <Button className="w-full" tabIndex={-1}>
              Sign up
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
