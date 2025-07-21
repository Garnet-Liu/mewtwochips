import { CounterContent } from "./counter-content";
import { CounterStoreProvider } from "./counter-provider";

export function CounterStore() {
  return (
    <CounterStoreProvider>
      <CounterContent />
    </CounterStoreProvider>
  );
}
