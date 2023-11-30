"use client";

import { MouseEvent, useState } from "react";
import Link from "next/link";

import { useAppSelector } from "@/hooks/redux.hook";
import { EAuthState } from "@/interfaces/auth.interface";
import { auth } from "@/services/firebase-client.service";

export default function AvatarButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const authInfo = useAppSelector((state) => state.auth);

  console.log("auth", authInfo);
  console.log("auth userInfo token", authInfo.userInfo?.token);

  if (authInfo.state === EAuthState.PENDING) {
    return (
      <div>
        ddddddd
      </div>
    );
  } else if (authInfo.state === EAuthState.LOGIN) {
    const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      auth.signOut().then(() => {
        console.log("firebase sign out");
      });
    }
    return (
      <div>
        dddd
      </div>
    );
  } else {
    return (
      <Link href={"/auth/login"}>
        login
        {/*<IconButton color="primary">*/}
        {/*  <Avatar>*/}
        {/*    <LoginIcon/>*/}
        {/*  </Avatar>*/}
        {/*</IconButton>*/}
      </Link>
    );
  }
}
