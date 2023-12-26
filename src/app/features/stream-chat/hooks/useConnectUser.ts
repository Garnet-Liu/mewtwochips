import { useEffect, useState } from "react";
import {
  Channel,
  DefaultGenerics,
  ExtendableGenerics,
  OwnUserResponse,
  StreamChat,
  UserResponse,
} from "stream-chat";

import { env } from "../../../../../env.mjs";

/**
 * A hook which handles the process of connecting/disconnecting a user
 * to the Stream Chat backend.
 *
 * @param retry the Stream app channel to use.
 * @param channelId the Stream app channel to use.
 * @param userToConnect the user information.
 */
export const useConnectUser = <SCG extends ExtendableGenerics = DefaultGenerics>(
  retry: boolean,
  channelId: string,
  userToConnect: OwnUserResponse<SCG> | UserResponse<SCG>,
) => {
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);
  const [chatChannel, setChatChannel] = useState<Channel<SCG> | null>(null);
  const [error, setError] = useState<boolean>(false);
  // const { openToast } = useToastStore();

  useEffect(() => {
    let didUserConnectInterrupt = false;
    let connectionPromise: Promise<void>;
    let currentClient: StreamChat<SCG>;

    if (userToConnect.id && userToConnect.name) {
      setError(false);
      const getChatToken = fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/get-chat-token`, {
        method: "POST",
        body: JSON.stringify({ user_id: userToConnect.id, channel_id: channelId, retry }),
      }).then(async (res) => {
        if (res.ok && res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          const result = await res.json();
          return new Promise((_, reject) => {
            const error = new Error(result);
            const obj = {
              httpCode: res.status,
              statusText: result,
              url: res.url,
            };
            reject(Object.assign(error, obj));
          });
        }
      });

      getChatToken
        .then(({ token: apiKey }: { token: string }) => {
          currentClient = new StreamChat<SCG>(env.NEXT_PUBLIC_CHAT_STREAM_API_KEY);

          connectionPromise = currentClient.connectUser(userToConnect, apiKey).then(() => {
            if (!didUserConnectInterrupt) {
              setChatClient(currentClient);
              const channel = currentClient.channel("livestream", channelId);
              channel.watch().then(() => {
                setChatChannel(channel);
              });
            }
          });
        })
        .catch((e) => {
          // openToast(createErrorToast(e));
          console.log(e);
          setError(true);
        });
    }

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      setChatChannel(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        ?.then(() => currentClient?.disconnectUser())
        .catch((e) => {
          console.warn("connection closed", e);
        });
    };
  }, [channelId, retry, userToConnect]);

  return { client: chatClient, channel: chatChannel, error: error };
};
