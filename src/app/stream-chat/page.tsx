"use client";

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

import { useConnectUser } from "@/app/stream-chat/hooks/useConnectUser";

import "./LiveStreamChat.css";

const CustomMessageOptions = (props: MessageOptionsProps) => {
  return <MessageOptions {...props} />;
};

export default function Page() {
  const channelId = "31cba729-1bf8-4b0c-bd45-5873d3f839ac";
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
            channel={channel}
            MessageOptions={CustomMessageOptions}
            MessageTimestamp={() => null}
          >
            <Window hideOnThread>
              <VirtualizedMessageList />
              <MessageInput />
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
