import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="">
      <h1 className="text-2xl">Three Demo</h1>

      <ul>
        <li>
          <Button variant="link" asChild>
            <Link href="/three/robot">Robot</Link>
          </Button>
        </li>

        <li>
          <Button variant="link" asChild>
            <Link href="/three/urdf">Three URDF</Link>
          </Button>
        </li>

        <li>
          <Button variant="link" asChild>
            <Link href="/three/space-game">Space Game</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
