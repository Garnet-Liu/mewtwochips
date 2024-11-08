import { NextResponse } from "next/server";

import { auth } from "@/next-auth/auth";
import { firebaseAdmin } from "@/firebase/firebase-admin";
import { getPokemonDetail } from "@/servers/pokemon-detail.service";

export const GET = auth(async (req, ctx) => {
  const params = await ctx.params;
  const name = params?.name;
  console.log("request pokemon name =====>", name);
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(req.auth?.user.idToken ?? "");

    console.log("===============>", user.name);

    return getPokemonDetail(name).then((pokemon) => {
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: pokemon,
      });
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        code: 500,
        data: null,
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
});
