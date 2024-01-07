import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Avatar } from "@radix-ui/themes";
import { Session } from "next-auth";

import { cn } from "@/context/cn";
import { Maybe } from "@/gql/graphql";

interface Props extends HTMLAttributes<HTMLDivElement> {
  status: string;
  fallback?: ReactNode;
  session?: Maybe<Session>;
}

export const AvatarMenu = forwardRef<HTMLDivElement, Props>(function AvatarMenuRef(props, ref) {
  const { session, fallback, status, className, ...other } = props;
  return (
    <div ref={ref} className={cn("relative", className)} {...other}>
      {status === "loading" && (
        <div
          className={cn([
            "absolute",
            "left-0",
            "top-0",
            "-m-1",
            "box-content",
            "h-full",
            "w-full",
            "rounded-full",
            "border-4",
            "border-l-transparent",
            "duration-700 ",
            "ease-linear",
            "animate-in",
            "spin-in-[360deg]",
            "repeat-infinite",
          ])}
        />
      )}

      <Avatar
        size="3"
        radius="full"
        fallback={
          session?.user?.name?.charAt(0) ?? session?.user?.email?.charAt(0) ?? fallback ?? "?"
        }
        src={session?.user?.image ?? undefined}
      />
    </div>
  );
});
