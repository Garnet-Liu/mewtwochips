import { parseCookies } from "nookies";
import { cookies } from "next/headers";

import UserProfile from "@/app/components/user-profile/user-profile";

export default async function Home() {
  // const parsedCookies = parseCookies({ req: request });
  // console.log("parsedCookies", parsedCookies);
  const idToken = cookies().get("token");
  console.log("idToken", idToken);
  return (
    <main className="p-24">
      <UserProfile/>
    </main>
  );
}
