import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

import { SignIn } from "@/components/auth/sign-in";
import { SignUp } from "@/components/auth/sign-up";

export function AuthTab() {
  return (
    <Tabs defaultValue="signIn" className="mx-auto w-90">
      <TabsList>
        <TabsTrigger value="signIn">Sign In</TabsTrigger>
        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="signIn">
        <SignIn />
      </TabsContent>

      <TabsContent value="signUp">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
}
