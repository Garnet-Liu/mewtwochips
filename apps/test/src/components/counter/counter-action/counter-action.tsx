"use client";

import { useActionState } from "react";
import { Repeat } from "lucide-react";
import { toast } from "sonner";

import { useT } from "@/libs/i18n/client";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { apiFetchRequest } from "@/common/fetch-request";

interface IFormData {
  count: number;
}

export function CounterAction() {
  const [result, asyncAction, isPending] = useActionState<IFormData, FormData>(
    async (previousState, formData) => {
      return await apiFetchRequest<IFormData>(`${window.location.origin}/api/features/counter`, {
        method: "POST",
        body: formData,
      }).catch((e) => {
        toast.error(e?.message);
        return previousState;
      });
    },
    { count: 0 },
  );

  const { t } = useT("counter");

  return (
    <form action={asyncAction} className="contents">
      <h1 className="self-center text-right">{t("action-state", { ns: "counter" })}:</h1>

      <div className="flex items-center gap-3">
        <Input className="w-20 text-center" disabled={isPending} name="count" />

        <Input
          className="w-20 text-center"
          disabled={isPending}
          name="now"
          value={result.count}
          readOnly
        />

        <Button type="submit" disabled={isPending}>
          <Loading loading={isPending}>
            <Repeat size={16} />
          </Loading>
          {t("sync", { ns: "counter" })}
        </Button>

        <p>Result: {result.count}</p>
      </div>
    </form>
  );
}
