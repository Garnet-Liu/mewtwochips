"use client";

import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const features = [
  { path: "/pokemon", name: "Pokemon" },
  { path: "/photos", name: "Photos" },
  { path: "/counter", name: "Counter" }
];

export default function FeatureDrawer() {
  const route = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton size="large" edge="start" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
        <MenuIcon/>
      </IconButton>

      <Button onClick={() => route.back()}>Back</Button>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 300 }}>
          {features.map((feature, index) => {
            const isActive = pathname.startsWith(feature.path);
            return (
              <ListItem key={feature.name} disablePadding>
                <Link style={{ width: "100%" }} href={feature.path}>
                  <ListItemButton onClick={() => setOpen(false)} selected={isActive}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={feature.name}/>
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider/>
      </Drawer>
    </div>
  );
}
