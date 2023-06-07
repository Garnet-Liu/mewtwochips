"use client";

import Image from 'next/image';

import { EAuthState } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/redux/hooks/redux.hook";

export default function UserProfile() {
  console.log("UserProfile");
  const auth = useAppSelector((state) => state.auth);

  if (auth.state === EAuthState.PENDING) {
    return <div>等一下！！！！！</div>;
  } else if (auth.state === EAuthState.LOGOUT) {
    return <div>请登陆查看User信息！</div>;
  } else {
    return (
      <div className="w-[300px] flex flex-col items-start">
        <Image className='self-center' src={auth.userInfo?.photoURL || ''} priority={true} width={100} height={100} alt="avatar"/>
        <p>name: {auth.userInfo?.displayName}</p>
        <p>email: {auth.userInfo?.email}</p>
      </div>
    );
  }
}
