import { useEffect, useState } from "react";
import {
  Channel,
  DefaultGenerics,
  ExtendableGenerics,
  OwnUserResponse,
  StreamChat,
  UserResponse,
} from "stream-chat";

import { env } from "../../../../../../env.mjs";
import { apiFetchRequest } from "@/context/apiFetchRequest";

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
      apiFetchRequest<{ token: string }>(`/api/features/get-chat-token`, {
        method: "POST",
        body: JSON.stringify({ user_id: userToConnect.id, channel_id: channelId, retry }),
      })
        .then(({ token: apiKey }) => {
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
