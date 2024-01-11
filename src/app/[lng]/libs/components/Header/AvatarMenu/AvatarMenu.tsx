import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Avatar } from "@radix-ui/themes";
import { User } from "firebase/auth";

import { cn } from "@/context/cn";
import { Maybe } from "@/gql/graphql";
import { EAuthState } from "@/context/firebase/client";

interface Props extends HTMLAttributes<HTMLDivElement> {
  user: Maybe<User>;
  status: string;
  fallback?: ReactNode;
}

export const AvatarMenu = forwardRef<HTMLDivElement, Props>(function AvatarMenuRef(props, ref) {
  const { user, fallback, status, className, ...other } = props;
  return (
    <div ref={ref} className={cn("relative", className)} {...other}>
      {status === EAuthState.LOADING && (
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
        fallback={user?.displayName?.charAt(0) ?? user?.email?.charAt(0) ?? fallback ?? "?"}
        src={user?.photoURL ?? undefined}
      />
    </div>
  );
});
