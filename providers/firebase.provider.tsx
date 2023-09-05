"use client";

import { ReactNode, useEffect } from "react";
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
          // 刷新一个全新的token
          await user.getIdToken(true);
          // token是一个小时过期，所以应该是55分钟刷新一次
        }, 55 * 60 * 1000);
        // 每次程序加载都获取一个全新的token
        const idToken = await user.getIdToken(true);
        const userInfo: IUserInfo = {
          uid: user.uid,
          token: idToken,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified
        };
        nookies.set(undefined, "token", idToken, { path: "/" });
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
