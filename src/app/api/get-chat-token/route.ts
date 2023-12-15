import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

import { env } from "../../../../env.mjs";

export async function POST(request: Request) {
  const res = await request.json();
  if (res.hasOwnProperty("user_id") && res.hasOwnProperty("channel_id")) {
    const { channel_id, user_id } = res;
    try {
      const serverClient = StreamChat.getInstance(
        env.NEXT_PUBLIC_STREAM_API_KEY,
        env.NEXT_PUBLIC_STREAM_API_SECRET,
      );

      const token = serverClient.createToken(user_id);
      const channel = serverClient.channel("livestream", channel_id, {
        created_by_id: user_id || "zerocool_break_creation",
      });
      await channel.create();
      await channel.addMembers([{ user_id: user_id, channel_role: "channel_moderator" }]);
      return NextResponse.json({ token });
    } catch (error) {
      console.log(error);
      return NextResponse.json((error as Error)?.message, { status: 500 });
    }
  } else {
    return NextResponse.json("There is no user_id or channel_id.", { status: 500 });
  }
}
