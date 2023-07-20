import { IBaseResponse } from "@/interfaces/api.interface";

export const clientFetchRequest = <T>(url: string, init?: RequestInit): Promise<IBaseResponse<T>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, init).then((res) => res.json());
};

export const serverFetchRequest = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init).then((res) => res.json());
};
