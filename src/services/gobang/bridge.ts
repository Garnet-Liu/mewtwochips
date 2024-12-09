import { EventResType, EWorkerAction } from "@/types/gobang";

const worker = new Worker(new URL("./1.0.0/bridge.worker", import.meta.url));
// const worker = new Worker(new URL("./2.0.0/bridge.worker", import.meta.url));

console.log("bridge ===>", worker);

export const start = async (first: boolean, depth: number) => {
  return new Promise<EventResType["payload"]>((resolve) => {
    worker.postMessage({ action: EWorkerAction.START, payload: { first, depth } });

    worker.onmessage = (event: MessageEvent<EventResType>) => {
      const { action, payload } = event.data;
      if (action === EWorkerAction.START) {
        resolve(payload);
      }
    };
  });
};

export const play = async (position: [number, number]) => {
  return new Promise<EventResType["payload"]>((resolve) => {
    worker.postMessage({ action: EWorkerAction.PLAY, payload: { position } });

    worker.onmessage = (event: MessageEvent<EventResType>) => {
      const { action, payload } = event.data;
      if (action === EWorkerAction.PLAY) {
        resolve(payload);
      }
    };
  });
};

export const undo = async () => {
  return new Promise<EventResType["payload"]>((resolve) => {
    worker.postMessage({ action: EWorkerAction.UNDO });

    worker.onmessage = (event: MessageEvent<EventResType>) => {
      const { action, payload } = event.data;
      if (action === EWorkerAction.UNDO) {
        resolve(payload);
      }
    };
  });
};

export const end = async () => {
  return new Promise<EventResType["payload"]>((resolve) => {
    worker.postMessage({ action: EWorkerAction.END });

    worker.onmessage = (event: MessageEvent<EventResType>) => {
      const { action, payload } = event.data;
      if (action === EWorkerAction.END) {
        resolve(payload);
      }
    };
  });
};
