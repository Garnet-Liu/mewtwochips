"use client";

import { useMutation } from "@apollo/client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { Maybe } from "@/gql/graphql";
import { useToast } from "@/components";
import { ILanguage } from "@/types/globals";
import { useCurrentUser } from "@/context/firebase/client";
import { MutationAddVillage, SignInToast } from "@/app/[lng]/search/libs";

interface Props extends ILanguage {
  tag?: Maybe<string>;
}

export function AddVillage(props: Props) {
  const { tag, lng } = props;

  const [mutationAddVillage] = useMutation(MutationAddVillage);
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const toast = useToast();

  const handleAddVillage = async () => {
    if (currentUser && tag) {
      await mutationAddVillage({ variables: { tag: tag } });
      router.push(`/${lng}/tracker/villages/${encodeURIComponent(tag)}/update`);
    } else {
      const close = toast({
        description: "",
        Component: <SignInToast close={() => close()} />,
        duration: Infinity,
      });
    }
  };

  return (
    <Button className="col-span-1" onClick={handleAddVillage}>
      Add village
    </Button>
  );
}
