import { IBaseResponse } from "@/interfaces/api.interface";

export const clientFetchRequest = async <T>(url: string, init?: RequestInit): Promise<IBaseResponse<T>> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, init);
  return await res.json();
};

export const serverFetchRequest = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then((res) => res.json());
};
