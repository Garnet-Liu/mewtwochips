import { firebaseAuth } from "@/firebase/firebase";

export const checkFirebaseProvider = (id: string) => {
  return (firebaseAuth.currentUser?.providerData ?? [])?.some((p) => {
    return p.providerId === id;
  });
};
