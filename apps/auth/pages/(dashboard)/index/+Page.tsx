import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { useData } from "vike-react/useData";

import { Data } from "@/pages/+data";

export default function Page() {
  const session = useData<Data>();

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
    </div>
  );
}
