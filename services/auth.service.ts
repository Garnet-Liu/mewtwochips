import useSWR from "swr";

export const useGetApiUser = () => {
  return useSWR('api/message?d=1222', (url) => fetch(url).then(res => res.json()))
}
