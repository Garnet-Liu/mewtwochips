"use client";

import { useMemo } from "react";
import {
  Channel,
  Chat,
  MessageInput,
  MessageOptions,
  MessageOptionsProps,
  Thread,
  useChannelStateContext,
  useMessageContext,
  VirtualizedMessageList,
  Window,
} from "stream-chat-react";

import { useConnectUser } from "@/app/stream-chat/hooks/useConnectUser";

// import "@stream-io/stream-chat-css/dist/css/index.css";
import "./LiveStreamChat.css";

// const userToConnect: OwnUserResponse | UserResponse = {
//   id: "de9e3450-ca1e-4207-9979-0a5fbed19017",
//   name: "Garnet01"
// };
// const userTokenOrProvider: TokenOrProvider = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKb2tlbiIsImV4cCI6MTcwMDgwMzE5NSwiaWF0IjoxNzAwNzE2Nzk1LCJpc3MiOiJKb2tlbiIsImp0aSI6IjJ1ZDJocWg3ZmZldTBiMTZoODAxb2xkMSIsIm5iZiI6MTcwMDcxNjc5NSwidXNlcl9pZCI6ImRlOWUzNDUwLWNhMWUtNDIwNy05OTc5LTBhNWZiZWQxOTAxNyJ9.FCIbmwUe43z3zZ0wwdCrTRHJ9TEJy7RqLepiPY2mj1A"

const CustomMessageOptions = (props: MessageOptionsProps) => {
  const { theme = "simple" } = props;
  const { handleDelete, handleMute, getMessageActions } = useMessageContext("MessageActions");
  const { thread } = useChannelStateContext();
  const { handleOpenThread, message } = useMessageContext();
  const actions = getMessageActions();
  console.log(message.user?.name, actions);
  return <MessageOptions {...props} />;
};

export default function Page() {
  const channelId = "";
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
          {/*<ChannelList {...options} />*/}
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
