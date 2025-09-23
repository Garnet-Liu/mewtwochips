import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { useCallback } from "react";
import { useData } from "vike-react/useData";

import { authClient } from "@/lib/auth-client";
import { Data } from "@/pages/+data";

export default function Page() {
  const session = useData<Data>();

  const registerHandle = useCallback(async () => {
    const { data } = await authClient.oauth2.register({
      redirect_uris: ["http://localhost:6002/api/auth/oauth2/callback/mc-coc"], // required
      client_name: "Mewtwochips COC",
      scope: "openid profile email",
      contacts: ["mengyehuanyu@gmail.com"],
      metadata: { rop: "Mewtwochips COC" },
    });
    console.log("data", data);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className={"pb-4 text-3xl font-bold"}>Mewtwochips Auth</h1>

      <div className="flex items-center gap-8">
        <ul className="grid grid-cols-[auto_1fr] gap-6 text-sm">
          <li className="contents">
            <p>name:</p>
            <p>{session?.user.name}</p>
          </li>

          <li className="contents">
            <p>email:</p>
            <p>{session?.user.email}</p>
          </li>

          <li className="contents">
            <p>ID:</p>
            <p>{session?.user.id}</p>
          </li>
        </ul>

        <Avatar className="size-24">
          <AvatarFallback className="text-3xl">{session?.user.name.charAt(0)}</AvatarFallback>
          {session?.user.image && <AvatarImage src={session.user.image} />}
        </Avatar>
      </div>

      <Button
        onClick={() => {
          authClient.signOut();
        }}
      >
        Sign Out
      </Button>

      <Button onClick={registerHandle}>Register Client</Button>
    </div>
  );
}
