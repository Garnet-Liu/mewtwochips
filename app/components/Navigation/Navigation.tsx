"use client";

import { ChatIcon } from "@livekit/components-react";
import Link from "next/link";

const features = [
  { path: "/pokemon", name: "Pokemon", icon: <ChatIcon/> },
  { path: "/photos", name: "Photos", icon: <ChatIcon/> },
  { path: "/counter", name: "Counter", icon: <ChatIcon/> },
  { path: "/wagmi", name: "Wagmi", icon: <ChatIcon/> },
  { path: "/clash-of-clans", name: "Clash of Clans", icon: <ChatIcon/> },
  { path: "/apollographql", name: "Apollographql", icon: <ChatIcon/> },
  { path: "/media-devices", name: "MediaDevices", icon: <ChatIcon/> },
  { path: "/stream-chat", name: "Stream chat", icon: <ChatIcon/> },
  { path: "/wheel", name: "Wheel", icon: <ChatIcon/> }
];

export const Navigation = () => {
  return (
    <div className='w-56 bg-white'>
      {features.map((f, index) => {
        return (
          <Link key={index} href={f.path}>
            <div className="w-full h-10 px-4 flex items-center">
              {f.name}
            </div>
          </Link>
        );
      })}

    </div>
  );
};
