import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex gap-3">
        <h2>Not Found</h2>
        <div className="border-x" />
        <p>Could not find requested resource</p>
      </div>

      <Link href="/public">
        <Button size="4">Return Home</Button>
      </Link>
    </div>
  );
}
