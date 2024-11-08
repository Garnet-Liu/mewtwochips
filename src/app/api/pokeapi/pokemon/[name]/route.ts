import { NextResponse } from "next/server";

import { auth } from "@/next-auth/auth";
import { verifyIdToken } from "@/lib/verify-id-token";
import { getPokemonDetail } from "@/servers/pokemon-detail.service";

export const GET = auth(async (req, ctx) => {
  const params = await ctx.params;
  const name = params?.name;

  console.log("request pokemon name =====>", name);

  return await verifyIdToken(req.auth, async () => {
    return getPokemonDetail(name).then((pokemon) => {
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: pokemon,
      });
    });
  });
});
