import { NextResponse } from "next/server";

import { env } from "../../../../../env.mjs";
import { serverFetchRequest } from "@/services/fetch-request.service";
import { IClanDetail, IClanError } from "@/app/clash-of-clans/interfaces/clashOfSlans.interface";

export async function GET(request: Request) {
  console.log("request clash of clans GET: /clan");
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  console.log("tag", tag);

  if (tag) {
    try {
      const clan = await serverFetchRequest<IClanDetail | IClanError>(
        `https://api.clashofclans.com/v1/clans/${encodeURIComponent(`#${tag}`)}`,
        { headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` } },
      );
      if (clan.hasOwnProperty("reason")) {
        switch ((clan as IClanError).reason) {
          case "accessDenied.invalidIp":
            return NextResponse.json({
              code: 500,
              success: false,
              message: (clan as IClanError).message,
              data: null,
            });
          default:
            return NextResponse.json({
              code: 500,
              success: false,
              message: "not error",
              data: null,
            });
        }
      } else {
        return NextResponse.json({
          code: 200,
          success: true,
          message: "success",
          data: clan as IClanDetail,
        });
      }
    } catch (e) {
      return NextResponse.json({
        code: 500,
        success: false,
        message: "Something w.",
        data: null,
      });
    }
  } else {
    return NextResponse.json({
      code: 500,
      success: false,
      message: "Don't have tag field.",
      data: null,
    });
  }
}
