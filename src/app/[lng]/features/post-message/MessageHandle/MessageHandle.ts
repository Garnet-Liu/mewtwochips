"use client";

import { useEffect } from "react";

export function MessageHandle() {
  useEffect(() => {
    const onWindowMessage = (event: MessageEvent<any>) => {
      if (event.data.type === "init") {
        console.log("origin", event.origin);
        console.log("origin", event.data);
      }
    };

    window.addEventListener("message", onWindowMessage);

    if (document.referrer) {
      window.parent.postMessage({ type: "ready" }, document.referrer);
    }

    console.log("onWindowMessage init...");

    return () => {
      window.removeEventListener("message", onWindowMessage);
    };
  }, []);
  return null;
}
