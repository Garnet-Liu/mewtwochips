"use client";

import { Box, Button, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

import { ILanguage } from "@/types/globals";
import { clientAuth } from "@/context/firebase/client";
import { sendPasswordResetEmail } from "@firebase/auth";

interface Props extends ILanguage {}

interface FormInput {
  email: string;
}

export function ForgotPasswordForm(props: Props) {
  const { lng } = props;
  const { handleSubmit, register, formState } = useForm<FormInput>({
    mode: "onTouched",
  });

  const { errors } = formState;

  const handleForgotPassword = async (values: FormInput) => {
    console.log("handleCreatAccount", values);
    try {
      await sendPasswordResetEmail(clientAuth(), values.email);
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
}
