import { NextResponse } from "next/server";

import { env } from "../../../../../env.mjs";
import { fetchRequest } from "@/context/fetch-request";
import { IClanDetail, IClanError } from "@/interfaces/clashOfClans.interface";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  let errorMessage = "Something went wrong!";
  try {
    if (tag) {
      const clan = await fetchRequest<IClanDetail | IClanError>(
        `https://api.clashofclans.com/v1/clans/${encodeURIComponent(`#${tag}`)}`,
        { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
      );
      if (!clan.hasOwnProperty("reason")) {
        return NextResponse.json({
          code: 200,
          success: true,
          message: "success",
          data: clan as IClanDetail,
        });
      }
    }
    errorMessage = "Don't have tag field.";
  } catch (e) {
    const error = e as any;
    errorMessage = `${error.reason}: ${error.message}`;
  }
  return NextResponse.json({
    code: 500,
    success: false,
    message: errorMessage,
    data: null,
  });
}
