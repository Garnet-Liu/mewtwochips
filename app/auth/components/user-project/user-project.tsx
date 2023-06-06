"use client";

import { useGetCurrentUser } from "@/services/auth.service";

export default function UserProject() {
  const { data, error, isLoading } = useGetCurrentUser();

  console.log("data", data);
  console.log("error", error);
  console.log("isLoading", isLoading);

  return (
    <div>
      <p>This is user project!!!!!!</p>

      {isLoading ? (
        <p>Project Loading</p>
      ) : error ? (
        <p>Project Error</p>
      ) : data ? (
        <p>{data.displayName}</p>
      ) : (
        <p>没有登陆没有Project信息！</p>
      )}
    </div>
  );
}
