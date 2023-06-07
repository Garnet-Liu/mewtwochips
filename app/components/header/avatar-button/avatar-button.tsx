"use client";

import { Avatar, Box, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { MouseEvent, useState } from "react";
import Link from "next/link";

import { auth } from "@/services/firebase.service";
import { EAuthState } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/redux/hooks/redux.hook";

export default function AvatarButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const authInfo = useAppSelector((state) => state.auth);

  console.log("auth", authInfo);

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
      auth.signOut().then(() => {
        console.log("sign out");
      });
    };
    return (
      <>
        <IconButton onClick={handleClick}>
          <Avatar alt="photoURL" src={authInfo.userInfo?.photoURL || ""}/>
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
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
      <Link href="/auth/login">
        <IconButton color="primary">
          <Avatar>
            <LoginIcon/>
          </Avatar>
        </IconButton>
      </Link>
    );
  }
}
