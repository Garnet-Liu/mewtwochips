import useSWR from "swr";

import { getCurrentUser } from "@/services/firebase.service";

export const useGetCurrentUser = () => {
  return useSWR("firebase-auth", getCurrentUser);
}

export const useGetApiUser = () => {
  return useSWR('api/message?d=1222', (url) => fetch(url).then(res => res.json()))
}
