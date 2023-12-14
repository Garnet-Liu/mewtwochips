import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";

import { env } from "../../../../env.mjs";

export async function POST(request: Request) {
  const res = await request.json();
  if (res.hasOwnProperty("user_id")) {
    const { livestream_id, user_id, identity } = res;
    try {
      // if this room doesn't exist, it'll be automatically created when the first
      // client joins
      const roomName = livestream_id;
      // identifier to be used for participant.
      // it's available as LocalParticipant.identity with livekit-client SDK
      const participantName = `${user_id}-${identity || "join"}`;

      const streamingAt = new AccessToken(env.NEXT_PUBLIC_LK_API_KEY, env.NEXT_PUBLIC_LK_API_SECRET, {
        identity: `${participantName}-streaming`
      });
      streamingAt.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
      });

      const securityAt = new AccessToken(env.NEXT_PUBLIC_LK_API_KEY, env.NEXT_PUBLIC_LK_API_SECRET, {
        identity: `${participantName}-security`
      });
      securityAt.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
      });

      const viewingAt = new AccessToken(env.NEXT_PUBLIC_LK_API_KEY, env.NEXT_PUBLIC_LK_API_SECRET, {
        identity: `${participantName}-viewing`
      });
      streamingAt.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
      });

      return NextResponse.json({
        streamingToken: streamingAt.toJwt(),
        securityToken: securityAt.toJwt(),
        viewingToken: viewingAt.toJwt()
      });
    } catch (error) {
      console.log("live kit error");
      console.log(error);
      return NextResponse.json((error as Error)?.message, { status: 500 });
    }
  } else {
    return NextResponse.json("There is no livestream_id or user_id.", { status: 500 });
  }
}
