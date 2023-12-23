"use client";

import { Button } from "@radix-ui/themes";

import { ToastStatus, useToast } from "@/app/toast/Toast";
import { cn } from "@/context/cn";

export default function Page() {
  const toast = useToast();

  const oneWeekAway = () => {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  };

  const prettyDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  };

  const handleOpenToast = (type: ToastStatus) => {
    toast({ description: prettyDate(oneWeekAway()), status: type, duration: 2000000 });
  };
  return (
    <div className="flex flex-col gap-3">
      <Button onClick={() => handleOpenToast(ToastStatus.MESSAGE)}>Message toast</Button>
      <Button onClick={() => handleOpenToast(ToastStatus.SUCCESS)} color="green">
        Success toast
      </Button>
      <Button onClick={() => handleOpenToast(ToastStatus.WARNING)} color="yellow">
        Warning toast
      </Button>
      <Button onClick={() => handleOpenToast(ToastStatus.ERROR)} color="red">
        Error toast
      </Button>
    </div>
  );
}
