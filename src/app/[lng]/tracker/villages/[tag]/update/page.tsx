import { Heading } from "@radix-ui/themes";
import Image from "next/image";

export default function Page() {
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4 py-10">
      <Heading align="center">Update Structures</Heading>
      <Image
        src="https://static.wikia.nocookie.net/clashofclans/images/a/a1/Cannon1.png/revision/latest/scale-to-width-down/100?cb=20230521100552"
        width="100"
        height="82"
        alt="cannon-1"
      />
    </main>
  );
}
