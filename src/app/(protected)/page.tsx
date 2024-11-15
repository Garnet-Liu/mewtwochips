import { auth } from "@/next-auth/auth";
import { UserAvatar } from "@/components/home/user-avatar";
import { UserSignOut } from "@/components/home/user-sign-out";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="page-content flex h-full items-center justify-center">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex justify-center">
            <UserAvatar className="h-24 w-24" session={session} />
          </div>

          <div className="grid w-96 grid-cols-[auto_1fr] gap-2">
            <div className="contents">
              <p>Username:</p>
              <p>{session?.user?.name}</p>
            </div>
            <div className="contents">
              <p>Email:</p>
              <p>{session?.user?.email}</p>
            </div>
            <div className="contents">
              <p>Email verified:</p>
              <p>{session?.user?.emailVerified ? "true" : "false"}</p>
            </div>
            <div className="contents">
              <p>Access token:</p>
              <p className="truncate">{session?.user?.idToken}</p>
            </div>
          </div>
        </div>

        <UserSignOut />
      </div>
    </div>
  );
}
