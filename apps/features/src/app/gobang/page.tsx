import { Board } from "@/components/gobang/board";
import { Control } from "@/components/gobang/control";
import { GobangStoreProvider } from "@/components/gobang/gobang-store";

export const metadata = {
  title: "Gobang - Mewtwochips - features",
};

export default async function Page() {
  return (
    <div className="flex flex-col space-y-4 pt-4">
      <GobangStoreProvider>
        <Board />

        <Control />
      </GobangStoreProvider>
    </div>
  );
}
