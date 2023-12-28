"use client";

import { EmojiPicker } from "stream-chat-react/emojis";
import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";
import { useMemo } from "react";
import {
  Channel,
  Chat,
  MessageInput,
  MessageOptions,
  MessageOptionsProps,
  Thread,
  VirtualizedMessageList,
  Window,
} from "stream-chat-react";

import { useConnectUser } from "@/app/[lng]/features/stream-chat/hooks/useConnectUser";

import "./LiveStreamChat.css";

init({ data }).then(() => {
  console.log("emoji init...");
});

const CustomMessageOptions = (props: MessageOptionsProps) => {
  return <MessageOptions {...props} />;
};

export default function Page() {
  const channelId = "f2a2fac0-810a-4ce7-9f32-873052b32e87";
  const user1 = useMemo(() => {
    return {
      id: "9e98c030-cd1b-43ac-a9fa-2be77be71ecb",
      name: "chongligarnet346",
    };
  }, []);
  const user2 = useMemo(() => {
    return {
      id: "de9e3450-ca1e-4207-9979-0a5fbed19017",
      name: "Garnet01",
    };
  }, []);

  const { client, channel } = useConnectUser(true, channelId, user1);

  return (
    <div className="mx-auto h-[600px] w-[1000px]">
      {client && channel ? (
        <Chat client={client} theme="str-chat__theme-dark">
          <Channel
            EmojiPicker={EmojiPicker}
            channel={channel}
            MessageOptions={CustomMessageOptions}
            MessageTimestamp={() => null}
          >
            <Window hideOnThread>
              <VirtualizedMessageList />
              <MessageInput emojiSearchIndex={SearchIndex} focus />
            </Window>
            <Thread fullWidth />
          </Channel>
        </Chat>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
