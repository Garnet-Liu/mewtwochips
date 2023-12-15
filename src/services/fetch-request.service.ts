import { IBaseResponse } from "@/interfaces/api.interface";

export const clientFetchRequest = async <T>(
  url: string,
  init?: RequestInit,
): Promise<IBaseResponse<T>> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, init);
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    return new Promise((_, reject) => {
      const error = new Error(result);
      const obj = {
        httpCode: res.status,
        statusText: result,
        url: res.url,
      };
      reject(Object.assign(error, obj));
    });
  }
};

export const serverFetchRequest = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);
  return await res.json();
};
