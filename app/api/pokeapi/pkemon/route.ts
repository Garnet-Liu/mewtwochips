import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`, { method: "GET" });
  const product = await res.json();

  return NextResponse.json({ product });
}
