import { NextResponse } from "next/server";

import { auth } from "@/next-auth/auth";
import { verifyIdToken } from "@/lib/verify-id-token";

export const POST = auth(async (req) => {
  const formData = await req.formData();

  return await verifyIdToken(req.auth, async () => {
    const count = formData.get("count");
    const now = formData.get("now");

    console.log("<========= formData", { count, now });

    if (!count || !now) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          message: "Invalid request",
          data: null,
        },
        { status: 400 },
      );
    } else {
      const total = Number(count) + Number(now);

      console.log("<========= request counter count", count);

      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: { count: total },
      });
    }
  });
});
