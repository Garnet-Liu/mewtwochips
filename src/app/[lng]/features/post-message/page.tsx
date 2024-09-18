import { MessageHandle } from "@/app/[lng]/features/post-message/MessageHandle/MessageHandle";

export const dynamic = "force-dynamic";

export default async function PostMessage() {
  const dataResponse = await fetch("http://localhost:3000/api/features/message");
  const data = await dataResponse.json();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <MessageHandle />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
