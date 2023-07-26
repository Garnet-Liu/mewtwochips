"use client";

import { ReactNode, useEffect } from "react";
import { User } from "@firebase/auth";
import nookies from "nookies";

import { useAppDispatch } from "@/hooks/redux.hook";
import { auth } from "@/services/firebase-client.service";
import { EAuthState, IUserInfo } from "@/interfaces/auth.interface";
import { resetUser, updateUser } from "@/redux/features/auth-slice";

export default function FirebaseProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let tokenTimeOut: NodeJS.Timeout;

    const stateUnsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // 登陆之后，定时刷新token，防止SSR页面token过期，无法获取数据
        tokenTimeOut = setTimeout(async () => {
          await creatUserInfo(user);
          // token是两个小时过去，所以应该是115分钟刷新一次，但是这个时间需要确定一下
        }, 55 * 60 * 1000);
        const userInfo = await creatUserInfo(user);
        nookies.set(undefined, "token", userInfo.token, { path: "/" });
        dispatch(updateUser({ state: EAuthState.LOGIN, userInfo: userInfo }));
      } else {
        clearInterval(tokenTimeOut);
        nookies.set(undefined, "token", "", { path: "/", expires: new Date("1970-01-01") });
        dispatch(resetUser());
      }
    });

    return () => {
      stateUnsubscribe();
      clearInterval(tokenTimeOut);
    };
  }, [dispatch]);

  return (
    <>{children}</>
  );
}

const creatUserInfo = async (user: User): Promise<IUserInfo> => {
  const idToken = await user.getIdToken(true);
  return {
    uid: user.uid,
    token: idToken,
    email: user.email,
    photoURL: user.photoURL,
    providerId: user.providerId,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified
  };
};
