import { HTMLAttributes } from "react";
import { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  session: Session | null;
}

export function UserAvatar(props: Readonly<IProps>) {
  const { session, className } = props;
  return (
    <Avatar className={className}>
      <AvatarImage alt="avatar of user" src={session?.user?.image ?? undefined} />
      <AvatarFallback>{session?.user?.name?.charAt(0) ?? "?"}</AvatarFallback>
    </Avatar>
  );
}
