"use client";

import { Minus, Plus } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetchRequest } from "@/lib/fetch-request";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface IFormData {
  count: number;
}

export default function Page() {
  const [result, asyncAction, isPending] = useActionState<IFormData, FormData>(
    async (previousState, formData) => {
      try {
        return await apiFetchRequest<IFormData>(`${window.location.origin}/api/features/counter`, {
          method: "POST",
          body: formData,
        });
      } catch (e) {
        console.warn(e);
        toast.error((e as Error)?.message);
      }
      return previousState;
    },
    { count: 0 },
  );

  const count = result.count.toString();

  return (
    <div className="flex justify-center pt-20">
      <form action={asyncAction} className="flex flex-col gap-2">
        <div className="flex justify-center gap-3">
          <Button type="button" size="icon" disabled={isPending}>
            <Plus />
          </Button>

          <InputOTP name="now" maxLength={count.length} value={count}>
            <InputOTPGroup>
              {new Array(count.length).fill(0).map((_, index) => (
                <InputOTPSlot index={index} key={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button type="button" size="icon" disabled={isPending}>
            <Minus />
          </Button>
        </div>

        <div className="flex w-full gap-3">
          <Input className="w-10" name="count" disabled={isPending} />

          <Button type="submit" className="flex-1" size="icon" disabled={isPending}>
            Async
          </Button>
        </div>
      </form>
    </div>
  );
}
