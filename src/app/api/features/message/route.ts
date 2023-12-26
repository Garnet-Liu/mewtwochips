import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams", searchParams);

  const token = headers().get("Authorization");

  console.log("cookies token", token);
  // const id = searchParams.get("id");
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY as string
  //   }
  // });
  // const product = await res.json();

  return NextResponse.json({ name: "Jie Liu", token: token });
}
