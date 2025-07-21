"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Loading } from "@repo/ui/components/loading";
import { apiFetchRequest } from "@repo/ui/lib/fetch-request";
import { Repeat } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";

interface IFormData {
  count: number;
}

export function CounterAction() {
  const [result, asyncAction, isPending] = useActionState<IFormData, FormData>(
    async (previousState, formData) => {
      return await apiFetchRequest<IFormData>(`${window.location.origin}/api/counter`, {
        method: "POST",
        body: formData,
      }).catch((e) => {
        toast.error(e?.message);
        return previousState;
      });
    },
    { count: 0 },
  );

  return (
    <form action={asyncAction} className="contents">
      <h1 className="self-center text-right">Action state:</h1>

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
          Sync
        </Button>

        <p>Result: {result.count}</p>
      </div>
    </form>
  );
}
