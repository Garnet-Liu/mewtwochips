import { sleep } from "@repo/ui/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const count = searchParams.get("count");
  const now = searchParams.get("now");

  await sleep(3000);

  return counterHandle(count, now);
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const count = formData.get("count");
  const now = formData.get("now");

  await sleep(3000);

  return counterHandle(count, now);
};

const counterHandle = (count: FormDataEntryValue | null, now: FormDataEntryValue | null) => {
  console.log("<========= counterHandle", { count, now });

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

    console.log("<========= request counter total", total);

    return NextResponse.json({
      code: 200,
      success: true,
      message: "success",
      data: { count: total },
    });
  }
};
