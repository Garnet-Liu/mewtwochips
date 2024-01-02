"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Box, Button, Card, Flex, Heading, Link, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (!(status === "loading") && !session) void signIn("google");
  //   if (session) window.close();
  // }, [session, status]);

  return (
    <main className="container mx-auto flex w-full flex-1 flex-col px-4">
      <Card size="4" style={{ height: 320 }}>
        <Heading as="h3" size="6" trim="start" mb="5">
          Sign up
        </Heading>

        <Box mb="5">
          <Label>
            <Text as="div" size="2" weight="bold" mb="2">
              Email address
            </Text>
            <TextField.Input tabIndex={-1} placeholder="Enter your email" />
          </Label>
        </Box>

        <Box mb="5" position="relative">
          <Box position="absolute" top="0" right="0" style={{ marginTop: -2 }}>
            <Link tabIndex={-1} size="2">
              Forgot password?
            </Link>
          </Box>

          <Label>
            <Text as="div" size="2" weight="bold" mb="2">
              Password
            </Text>
            <TextField.Input tabIndex={-1} placeholder="Enter your password" />
          </Label>
        </Box>

        <Flex mt="6" justify="end" gap="3">
          <Button tabIndex={-1} variant="outline">
            Create an account
          </Button>
          <Button tabIndex={-1}>Sign in</Button>
        </Flex>
      </Card>
    </main>
  );
}
