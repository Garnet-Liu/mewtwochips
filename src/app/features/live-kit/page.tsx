"use client";

import {
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  TrackReference,
  useConnectionQualityIndicator,
  useTracks,
} from "@livekit/components-react";
import { Track, ConnectionQuality } from "livekit-client";
import { useEffect, useState } from "react";

import "@livekit/components-styles";
import { env } from "../../../../env.mjs";

export default function Page() {
  const [token, setToken] = useState<{
    streamingToken: string;
    securityToken: string;
    viewingToken: string;
  }>();

  useEffect(() => {
    fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/features/get-live-kit-token`, {
      method: "POST",
      body: JSON.stringify({
        user_id: "365920e5-bd87-4499-9c10-bbe84e0b1e33",
        livestream_id: "fd5eacab-f0fa-47ef-b6d8-5d6b12925b3a",
        identity: "join",
      }),
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((res: { streamingToken: string; securityToken: string; viewingToken: string }) => {
        console.log("res", JSON.stringify(res));
        setToken(res);
      });
  }, []);

  if (token) {
    return (
      <LiveKitRoom token={token.viewingToken} serverUrl={env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        {/*<RoomAudioRenderer />*/}
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
        {/*<ControlBar />*/}
      </LiveKitRoom>
    );
  } else {
    return null;
  }
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);
  // const tracks = useTracks(
  //   [
  //     { source: Track.Source.Camera, withPlaceholder: true },
  //     { source: Track.Source.ScreenShare, withPlaceholder: false },
  //   ],
  //   { onlySubscribed: false },
  // );
  console.log("tracks", tracks);
  return (
    <>
      {tracks[0] && <Test track={tracks[0]} />}
      <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
        {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
        <ParticipantTile />
      </GridLayout>
    </>
  );
}

const Test = ({ track }: { track: TrackReference }) => {
  const { quality } = useConnectionQualityIndicator({ participant: track.participant });
  return <div>{quality}</div>;
};
