"use client";

import Link from "next/link";

import { useAuthHandle } from "@/hooks";
import { useT } from "@/libs/i18n/client";
import { Button } from "@/components/ui/button";

export function UserActions() {
  const { signOut } = useAuthHandle();

  const { t } = useT("home");

  return (
    <div className="flex gap-3">
      <Link className="flex-1" href={`/src/app/%5Blng%5D/auth/change-password`}>
        <Button className="w-full">{t("change-password", { ns: "home" })}</Button>
      </Link>

      <Button className="flex-1" variant="outline" onClick={signOut}>
        {t("sign-out", { ns: "home" })}
      </Button>
    </div>
  );
}
