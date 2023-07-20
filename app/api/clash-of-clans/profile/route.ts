import { DecodedIdToken } from "firebase-admin/auth";
import { NextResponse } from "next/server";

import { db } from "@/services/firebase-admin.service";
import { IProfile } from "@/interfaces/profile.interface";
import { IBaseResponse } from "@/interfaces/api.interface";
import { verifyTokenTool } from "@/tools/verify-token.tool";

const initProfile: IProfile = {
  clans: []
};

export async function GET(request: Request) {
  console.log("request clash of clans GET: /profile");

  return verifyTokenTool<IBaseResponse<IProfile>>((d: DecodedIdToken) => {
    return db.ref(`profile/${d.uid}`).once("value").then((snapshot) => {
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: Object.assign({}, initProfile, snapshot.val()) as IProfile
      });
    });
  });
}

export async function PUT(request: Request) {
  console.log("request clash of clans GET: /profile");
  const profile = await request.json();

  const demo = "#2LU0V9CCG";
  return verifyTokenTool<IBaseResponse<IProfile>>(async (d: DecodedIdToken) => {
    await db.ref("profile").child(d.uid).update(
      Object.assign({}, initProfile, { ...profile, clans: [...profile.clans, demo] }) as IProfile
    );
    return db.ref(`profile/${d.uid}`).once("value").then((snapshot) => {
      console.log("snapshot.val()", snapshot.val());
      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: Object.assign({}, initProfile, snapshot.val()) as IProfile
      });
    });
  });
}
