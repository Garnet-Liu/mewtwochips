import { headers } from "next/headers";

export function requestHeaders(h: Awaited<ReturnType<typeof headers>>) {
  const headers: Record<string, string> = {};

  h.forEach((key, value) => {
    headers[key] = value;
  });

  return headers;
}
