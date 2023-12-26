import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log("request body", res);

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: res.amount });
}
