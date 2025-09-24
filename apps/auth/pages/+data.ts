import type { PageContextServer } from "vike/types";

import { auth } from "@/lib/auth";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  // We remove data we don't need because the data is passed to the client; we should
  // minimize what is sent over the network.
  return auth.api.getSession({ headers: new Headers(pageContext.headers ?? {}) });
}
