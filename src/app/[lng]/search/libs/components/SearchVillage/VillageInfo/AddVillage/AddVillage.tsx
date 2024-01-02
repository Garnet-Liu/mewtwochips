"use client";

import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Button } from "@radix-ui/themes";

import { useToast } from "@/components";
import { MutationAddVillage, SignInToast } from "@/app/[lng]/search/libs";

interface Props {
  tag: string;
}

export function AddVillage(props: Props) {
  const { tag } = props;
  const [mutationAddVillage] = useMutation(MutationAddVillage);
  const { data } = useSession();
  const toast = useToast();
  const handleAddVillage = async () => {
    console.log("data", data);
    const result = await mutationAddVillage({ variables: { tag: tag } });
    console.log("result", result);
    // if (data) {
    //   console.log("handleAddVillage", tag);
    //   const result = await mutationAddVillage({ variables: { tag: tag } });
    //   console.log("result", result);
    // } else {
    //   const close = toast({
    //     description: "",
    //     Component: <SignInToast close={() => close()} />,
    //     duration: Infinity,
    //   });
    // }
  };

  return (
    <Button className="col-span-1" onClick={handleAddVillage}>
      Add village
    </Button>
  );
}
