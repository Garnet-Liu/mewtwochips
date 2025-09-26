onmessage = function (event: MessageEvent) {
  console.log("event", event);
  const { data } = event;

  postMessage({ action: data.action });
};
