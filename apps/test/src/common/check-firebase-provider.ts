import { firebaseAuth } from "@/libs/firebase/firebase-client";

export const checkFirebaseProvider = (id: string) => {
  return (firebaseAuth.currentUser?.providerData ?? [])?.some((p) => {
    return p.providerId === id;
  });
};
