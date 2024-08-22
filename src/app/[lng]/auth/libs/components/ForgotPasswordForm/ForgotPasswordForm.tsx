"use client";

import { Box, Button, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { AuthError, sendPasswordResetEmail } from "@firebase/auth";

import { ToastStatus, useToast } from "@/components";
import { ILanguage } from "@/types/globals";
import { clientAuth } from "@/context/firebase/client";

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

  const toast = useToast();

  const handleForgotPassword = async (values: FormInput) => {
    console.log("handleCreatAccount", values);
    try {
      await sendPasswordResetEmail(clientAuth(), values.email);
      toast({ description: "重置密码邮件已发送到您的邮箱", status: ToastStatus.SUCCESS });
    } catch (e) {
      const error = e as AuthError;
      console.log("sendPasswordResetEmail error", e);
      toast({ description: error.message, status: ToastStatus.ERROR });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <Box mb="5" className="relative">
        <Label>
          <Text as="div" size="2" weight="bold" mb="2">
            Email address
          </Text>

          <TextField.Root
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
