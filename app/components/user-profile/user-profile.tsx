"use client";

import Image from "next/image";

import { EAuthState } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/redux/hooks/redux.hook";

export default function UserProfile() {
  console.log("UserProfile");
  const auth = useAppSelector((state) => state.auth);
  if (auth.state === EAuthState.PENDING) {
    return <div className="text-center">等一下！！！！！</div>;
  } else if (auth.state === EAuthState.LOGOUT) {
    return <div className="text-center">请登陆查看User信息！</div>;
  } else {
    const photo = auth.userInfo?.photoURL || "";
    return (
      <div className="flex justify-center items-center">
        <Image src={photo} priority={true} width={100} height={100} alt="avatar"/>
        <div className="ml-3">
          <div className="flex">
            <p className="w-14">name:</p>
            <p>{auth.userInfo?.displayName}</p>
          </div>
          <div className="flex">
            <p className="w-14">email:</p>
            <p>{auth.userInfo?.email}</p>
          </div>
          <div className="flex">
            <p className="w-14">uid:</p>
            <p>{auth.userInfo?.uid}</p>
          </div>
        </div>
      </div>
    );
  }
}
