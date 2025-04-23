import { HTMLAttributes } from "react";
import { User } from "@firebase/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  user: User | null;
}

export function UserAvatar(props: Readonly<IProps>) {
  const { user, className } = props;
  return (
    <Avatar className={className}>
      <AvatarImage alt="avatar of user" src={user?.photoURL ?? undefined} />
      <AvatarFallback>{user?.displayName?.charAt(0) ?? "?"}</AvatarFallback>
    </Avatar>
  );
}
