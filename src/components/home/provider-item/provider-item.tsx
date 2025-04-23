"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { unlink } from "firebase/auth";
import { toast } from "sonner";
import Link from "next/link";
import { Loader } from "lucide-react";

import { useT } from "@/libs/i18n/client";
import { Button } from "@/components/ui/button";
import { EProviderID, providers } from "@/types/auth";
import { firebaseAuth } from "@/libs/firebase/firebase-client";
import { checkFirebaseProvider } from "@/common/check-firebase-provider";

interface IProps {
  providerId: EProviderID;
  icon: ReactNode;
}

export function ProviderItem(props: IProps) {
  const { icon, providerId } = props;

  const { t } = useT("home");

  const [state, setState] = useState({
    loading: true,
    isLinked: false,
  });

  const unlinkProviderHandle = useCallback(() => {
    unlink(firebaseAuth.currentUser!, providerId)
      .then(() => {
        // Auth provider unlinked from account
        toast("Unlink success.");
      })
      .catch((error) => {
        // An error happened
        toast.error("Unlink error.", { description: error.messages });
      });
  }, [providerId]);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(() => {
      setState({ isLinked: checkFirebaseProvider(providerId), loading: false });
    });

    return () => unsubscribe();
  }, [providerId]);

  const name = providers.get(providerId);

  if (!name) {
    return null;
  }

  if (state.loading) {
    return (
      <Button variant="default" disabled>
        <Loader size={16} />
      </Button>
    );
  } else if (state.isLinked) {
    return (
      <Button variant="destructive" onClick={unlinkProviderHandle} className="flex-1">
        {icon} {t("unlink", { ns: "home" })}
      </Button>
    );
  } else {
    return (
      <Link className="flex-1" href={`/auth/(protected)/link/${name}`}>
        <Button className="w-full">
          {icon} {t("link", { ns: "home" })}
        </Button>
      </Link>
    );
  }
}
