"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

import "@livekit/components-styles";

export default function Page() {
  const [token, setToken] = useState<{
    streamingToken: string;
    securityToken: string;
    viewingToken: string;
  }>();

  useEffect(() => {
    fetch("/api/get-live-kit-token", {
      method: "POST",
      body: JSON.stringify({
        user_id: "365920e5-bd87-4499-9c10-bbe84e0b1e33",
        livestream_id: "cdc24840-a275-40a7-80d8-41691301fd45",
        identity: "join",
      }),
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((res: { streamingToken: string; securityToken: string; viewingToken: string }) => {
        console.log("res", res);
        setToken(res);
      });
  }, []);

  if (token) {
    return (
      <LiveKitRoom
        token={token.viewingToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
      >
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
        <ControlBar />
      </LiveKitRoom>
    );
  } else {
    return null;
  }
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
