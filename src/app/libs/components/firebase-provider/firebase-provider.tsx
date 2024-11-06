"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Unsubscribe } from "@firebase/util";
import { User } from "firebase/auth";

import { Spin } from "@/components/spin";
import { firebaseAuth } from "@/firebase/firebase";

interface Props {
  children: ReactNode;
}

export function FirebaseProvider({ children }: Readonly<Props>) {
  const { update, status } = useSession();
  const [loaded, setLoaded] = useState(true);

  const timerRef = useRef<NodeJS.Timeout>();
  const unsubscribeRef = useRef<Unsubscribe>();

  const getIdTokenResult = useCallback(
    async (refresh: boolean = false): Promise<[number, string]> => {
      const idTokenResult = await firebaseAuth.currentUser!.getIdTokenResult(refresh);
      const expTime = new Date(idTokenResult.expirationTime).getTime();
      const nowTime = new Date().getTime();

      if (expTime - nowTime - 5 * 60 * 1000 < 0) {
        return await getIdTokenResult(true);
      } else {
        return [expTime - nowTime - 5 * 60 * 1000, idTokenResult.token];
      }
    },
    [],
  );

  const checkUserIdToken = useCallback(
    async (user: User) => {
      const [time, idToken] = await getIdTokenResult();

      timerRef.current = setTimeout(() => {
        checkUserIdToken(user);
      }, time);

      await update({ idToken }).then((session) => {
        console.log("update session =>", session);
      });
    },
    [getIdTokenResult, update],
  );

  useEffect(() => {
    if (status !== "loading") {
      if (!unsubscribeRef.current) {
        unsubscribeRef.current = firebaseAuth.onAuthStateChanged(async (user) => {
          if (user) {
            await checkUserIdToken(user);
          } else if (!user && status === "authenticated") {
            await signOut().then(() => {
              console.log("Not user next auth sign out...");
              clearTimeout(timerRef.current);
            });
          }
          setLoaded(false);
        });
      } else {
        setLoaded(false);
      }
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [checkUserIdToken, status]);

  return (
    <Spin loading={loaded} className="h-screen">
      {children}
    </Spin>
  );
}
