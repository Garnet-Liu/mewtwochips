"use client";

import { Avatar, Box, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
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
      <Box sx={{ m: 1, position: "relative" }}>
        <Avatar/>
        <CircularProgress size={52} sx={{ position: "absolute", top: -6, left: -6, zIndex: 1 }}/>
      </Box>
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
      <>
        <IconButton onClick={handleClick}>
          <Avatar alt="photoURL" src={authInfo.userInfo?.photoURL || ""}/>
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  } else {
    return (
      <Link href={"/auth/login"}>
        <IconButton color="primary">
          <Avatar>
            <LoginIcon/>
          </Avatar>
        </IconButton>
      </Link>
    );
  }
}
