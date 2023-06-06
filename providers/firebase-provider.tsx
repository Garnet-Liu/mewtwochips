"use client";

import { ReactNode, useEffect } from "react";

import { auth } from "@/services/firebase.service";
import { useAppDispatch } from "@/redux/hooks/redux.hook";
import { EAuthState, IUserInfo } from "@/interfaces/auth.interface";
import { resetUser, updateUser } from "@/redux/features/auth-slice";

export default function FirebaseProvider({ children }: { children: ReactNode }) {
  console.log("FirebaseProvider");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("onAuthStateChanged");
        // const token = await user.getIdToken();
        const userInfo: IUserInfo = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          providerId: user.providerId,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified
        };
        dispatch(updateUser({ state: EAuthState.LOGIN, userInfo: userInfo }));
      } else {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        dispatch(resetUser());
      }
    });

    const tokenUnsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        console.log("onIdTokenChanged");
        user.getIdToken().then((token) => {
          document.cookie = `token=${token}`;
        });
      }
    });

    return () => {
      authUnsubscribe();
      tokenUnsubscribe();
    };
  }, [dispatch]);
  return (
    <>{children}</>
  );
}
