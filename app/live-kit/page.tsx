"use client";

import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useTracks,
  VideoTrack
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function LiveKitPage() {
  return (
    <LiveKitRoom
      // video={true}
      // audio={true}
      token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImNkYzI0ODQwLWEyNzUtNDBhNy04MGQ4LTQxNjkxMzAxZmQ0NSIsImNhblB1Ymxpc2giOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWV9LCJpYXQiOjE3MDEwNzUxNDEsIm5iZiI6MTcwMTA3NTE0MSwiZXhwIjoxNzAxMDk2NzQxLCJpc3MiOiJBUEluZHh5MkNUSENKVWUiLCJzdWIiOiJkZTllMzQ1MC1jYTFlLTQyMDctOTk3OS0wYTVmYmVkMTkwMTctcHVibGlzaC1wdWJsaXNoIiwianRpIjoiZGU5ZTM0NTAtY2ExZS00MjA3LTk5NzktMGE1ZmJlZDE5MDE3LXB1Ymxpc2gtcHVibGlzaCJ9.AemwbkDTw793ZnCmwiN3IC-5AqtWbsj0fcN9-OxefKQ"}
      serverUrl={"wss://fanaticslive-staging-nbofaz5v.livekit.cloud"}
      // Use the default LiveKit theme for nice styles.
      // data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference/>
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      {/*<RoomAudioRenderer/>*/}
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      {/*<ControlBar/>*/}
    </LiveKitRoom>
  );
}


function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks([Track.Source.Unknown, Track.Source.Microphone, Track.Source.Camera]);

  console.log("tracks", tracks);
  return tracks[0] && <VideoTrack trackRef={tracks[0]}/>;
  // return (
  //   <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
  //     {/* The GridLayout accepts zero or one child. The child is used
  //     as a template to render all passed in tracks. */}
  //     {/*<ParticipantTile/>*/}
  //     <VideoTrack trackRef={tracks[0]} />
  //   </GridLayout>
  // );
}
