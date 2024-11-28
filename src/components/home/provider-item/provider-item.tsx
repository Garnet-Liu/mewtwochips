"use client";

import { unlink } from "firebase/auth";
import { ReactNode } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { firebaseAuth } from "@/firebase/firebase";
import { EProviderID, providers } from "@/types/auth";
import { checkFirebaseProvider } from "@/lib/check-firebase-provider";

interface IProps {
  providerId: EProviderID;
  icon: ReactNode;
}

export function ProviderItem(props: IProps) {
  const { icon, providerId } = props;

  const unlinkProviderHandle = () => {
    unlink(firebaseAuth.currentUser!, providerId)
      .then(() => {
        // Auth provider unlinked from account
        toast("Unlink success.");
      })
      .catch((error) => {
        // An error happened
        toast.error("Unlink error.", { description: error.messages });
      });
  };

  const name = providers.get(providerId);

  if (!name) {
    return null;
  }

  if (checkFirebaseProvider(providerId)) {
    return (
      <Button variant="destructive" onClick={unlinkProviderHandle} className="flex-1">
        {icon} Unlink
      </Button>
    );
  } else {
    return (
      <Link className="flex-1" href={`/src/app/auth/(protected)/link/${name}`}>
        <Button className="w-full">{icon} Link</Button>
      </Link>
    );
  }
}
