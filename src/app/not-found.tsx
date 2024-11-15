import { OctagonAlert } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <OctagonAlert size={32} />
      <h2 className="font-bold">Not Found</h2>
      <p className="font-medium">Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
