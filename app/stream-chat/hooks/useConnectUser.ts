import { useCallback, useEffect, useState } from "react";
import {
  Channel,
  DefaultGenerics,
  ExtendableGenerics,
  OwnUserResponse,
  StreamChat,
  TokenOrProvider,
  UserResponse
} from "stream-chat";

/**
 * A hook which handles the process of connecting/disconnecting a user
 * to the Stream Chat backend.
 *
 * @param apiKey the Stream app API key to use.
 * @param userToConnect the user information.
 * @param userTokenOrProvider the user's token.
 */
export const useConnectUser = <SCG extends ExtendableGenerics = DefaultGenerics>(
  apiKey: string,
  userToConnect: OwnUserResponse<SCG> | UserResponse<SCG>,
  userTokenOrProvider: TokenOrProvider
) => {
  const [chatChannel, setChatChannel] = useState<Channel<SCG> | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);


  const initConnect = useCallback(async () => {
    const client = new StreamChat<SCG>(apiKey, {
      enableInsights: true,
      enableWSFallback: true
    });

    await client.connectUser(userToConnect, userTokenOrProvider);
    const channel = client.channel("livestream", "cb69ef39-ea6e-41e8-99b5-f767a22e9c30");
    await channel.watch();
    // await channel.addMembers([{ user_id: userToConnect.id, channel_role: "channel_moderator" }]);
    console.log("channel watch");

    setChatClient(client);
    setChatChannel(channel);
    return client;
  }, [apiKey, userToConnect, userTokenOrProvider]);

  useEffect(() => {
    let current: StreamChat<SCG>;
    let didUserConnectInterrupt = false;
    initConnect().then((client) => {
      if (!didUserConnectInterrupt) {

      }
      current = client;
    });


    return () => {
      // current?.disconnectUser().catch((e) => {
      //   console.error(`Failed to disconnect user`, e);
      // });
    };
  }, [initConnect]);

  return { client: chatClient, channel: chatChannel };
};
