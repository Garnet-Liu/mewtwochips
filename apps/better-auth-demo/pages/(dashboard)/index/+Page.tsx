import { useData } from "vike-react/useData";

import { Data } from "@/pages/+data";

export default function Page() {
  const session = useData<Data>();

  return (
    <div>
      <h1 className={"pb-4 text-3xl font-bold"}>My Vike app</h1>

      <p>This page is: Home</p>

      <ul>
        <li>name: {session?.user.name}</li>
      </ul>
    </div>
  );
}
