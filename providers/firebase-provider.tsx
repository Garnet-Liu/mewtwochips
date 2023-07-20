"use client";

import { ReactNode, useEffect } from "react";
import nookies from "nookies";

import { auth } from "@/services/firebase-client.service";
import { useAppDispatch } from "@/hooks/redux.hook";
import { EAuthState, IUserInfo } from "@/interfaces/auth.interface";
import { resetUser, updateUser } from "@/redux/features/auth-slice";

export default function FirebaseProvider({ children }: { children: ReactNode }) {
  console.log("FirebaseProvider");
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("FirebaseProvider useEffect");
    const tokenUnsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        console.log("onIdTokenChanged", user, 1);
        const userInfo: IUserInfo = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified
        };
        const idToken = await user.getIdToken();
        nookies.set(undefined, "token", idToken, { path: "/" });
        dispatch(updateUser({ state: EAuthState.LOGIN, userInfo: userInfo }));
        console.log("idToken", idToken);
      } else {
        console.log("onIdTokenChanged", user, -1);
        nookies.set(undefined, "token", "", { path: "/", expires: new Date("1970-01-01") });
        dispatch(resetUser());
      }
    });

    return () => tokenUnsubscribe();
  }, [dispatch]);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 55 * 60 * 1000);
    // clean up setInterval
    return () => clearInterval(handle);
  }, []);
  return (
    <>{children}</>
  );
}
