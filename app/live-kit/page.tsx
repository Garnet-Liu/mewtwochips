"use client";

import { AudioTrack, LiveKitRoom, useTracks, VideoTrack } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";

import "@livekit/components-styles";

export default function LiveKitPage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/api/getLiveKitToken", {
      method: "POST",
      body: JSON.stringify({
        user_id: "365920e5-bd87-4499-9c10-bbe84e0b1e33",
        livestream_id: "cdc24840-a275-40a7-80d8-41691301fd45",
        identity: "join"
      })
    })
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((res) => {
        console.log("res", res);
        setToken(res.token);
      });
  }, []);

  if (token) {
    return (
      <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference/>
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        {/*<RoomAudioRenderer/>*/}
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
        {/*<ControlBar/>*/}
      </LiveKitRoom>
    );
  } else {
    return null;
  }
}


function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks([Track.Source.Unknown, Track.Source.Microphone, Track.Source.Camera]);

  const videoTrack = tracks.find((t) => t.publication.kind === "video");
  const audioTrack = tracks.find((t) => t.publication.kind === "audio");
  console.log("tracks", tracks);
  return (
    <>
      {!!videoTrack ? <VideoTrack className="!w-[500px]" trackRef={videoTrack}/> : null}
      {!!audioTrack ? <AudioTrack className="!w-[500px]" trackRef={audioTrack} volume={1}/> : null}
    </>
  );
  // return (
  //   <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
  //     {/* The GridLayout accepts zero or one child. The child is used
  //     as a template to render all passed in tracks. */}
  //     {/*<ParticipantTile/>*/}
  //     <VideoTrack trackRef={tracks[0]} />
  //   </GridLayout>
  // );
}
