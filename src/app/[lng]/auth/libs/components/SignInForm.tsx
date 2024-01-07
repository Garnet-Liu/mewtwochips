"use client";

import { Box, Button, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

interface Props {
  callback: (formData: FormData) => void;
}

interface FormInput {
  email: string;
  password: string;
}

export function SignInForm(props: Props) {
  const { callback } = props;
  const { handleSubmit, register, formState } = useForm<FormInput>({
    mode: "onTouched",
  });

  const { errors } = formState;

  const handleSignIn = async (values: FormInput) => {
    const formDate = new FormData();

    Object.keys(values).forEach((key) => {
      formDate.set(key, values[key as keyof FormInput]);
    });

    callback(formDate);
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Box mb="5" className="relative">
        <Label>
          <Text as="div" size="2" weight="bold" mb="2">
            Email address
          </Text>

          <TextField.Input
            {...register("email", { required: "邮箱是必填项" })}
            tabIndex={-1}
            placeholder="Enter your email"
          />

          <Text as="p" size="1" mt="1" color="red" className="absolute">
            {errors.email?.message}
          </Text>
        </Label>
      </Box>

      <Box mb="5" position="relative">
        <Box position="absolute" top="0" right="0" className="-mt-[2px]">
          <Link tabIndex={-1} size="2" asChild>
            <NextLink href={"/auth/forgot-password"}>Forgot password?</NextLink>
          </Link>
        </Box>

        <Label>
          <Text as="div" size="2" weight="bold" mb="2">
            Password
          </Text>

          <TextField.Input
            {...register("password", { required: "密码是必填的" })}
            type="password"
            tabIndex={-1}
            placeholder="Enter your password"
          />

          <Text as="p" size="1" mt="1" color="red" className="absolute">
            {errors.password?.message}
          </Text>
        </Label>
      </Box>

      <Flex mt="6" justify="end" gap="3">
        <Button className="w-full" tabIndex={-1}>
          Sign in
        </Button>
      </Flex>

      <Text as="div" mt="4" size="3" align="center">
        Not a member?{" "}
        <Link asChild>
          <NextLink href={"/auth/sign-up"}>Sign Up</NextLink>
        </Link>
      </Text>
    </form>
  );
}
