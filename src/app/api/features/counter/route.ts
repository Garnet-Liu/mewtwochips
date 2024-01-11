import { NextResponse } from "next/server";
import { adminAuth } from "@/context/firebase/server/firebaseAdmin";

export async function POST(request: Request) {
  const res = await request.json();
  console.log("request body", res);

  try {
    const sss = await adminAuth().verifyIdToken("dsdsdsd");
    console.log("sss", sss);
  } catch (e) {}
  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: res.amount });
}
