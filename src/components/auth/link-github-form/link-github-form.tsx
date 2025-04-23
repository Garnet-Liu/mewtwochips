"use client";

import { GithubAuthProvider, linkWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { firebaseAuth } from "@/libs/firebase/firebase-client";

const provider = new GithubAuthProvider();

export function LinkGithubForm() {
  const router = useRouter();

  const linkWithGithubHandle = () => {
    linkWithPopup(firebaseAuth.currentUser!, provider)
      .then((result) => {
        const user = result.user;
        toast.success(user.displayName, { description: "Account linking success." });
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.warn(error);
      });
  };

  return <Button onClick={linkWithGithubHandle}>Link with github</Button>;
}
