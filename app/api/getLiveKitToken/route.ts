import { AccessToken } from "livekit-server-sdk";
import { NextResponse } from "next/server";

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

      const at = new AccessToken(process.env.NEXT_PUBLIC_LK_API_KEY, process.env.NEXT_PUBLIC_LK_API_SECRET, {
        identity: participantName
      });
      at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
      });

      const token = at.toJwt();
      console.log("roomName", roomName);
      console.log("participantName", participantName);
      return NextResponse.json({ token });
    } catch (error) {
      console.log("live kit error");
      console.log(error);
      return NextResponse.json((error as Error)?.message, { status: 500 });
    }
  } else {
    return NextResponse.json("There is no livestream_id or user_id.", { status: 500 });
  }
}
