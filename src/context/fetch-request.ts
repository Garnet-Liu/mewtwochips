import { IBaseResponse } from "@/interfaces/api.interface";

export const fetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  const result = await baseFetchRequest<IBaseResponse<T>>(url, init);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
};

export const baseFetchRequest = async <T = any>(url: string, init?: RequestInit): Promise<T> => {
  const f = fetch(url, init);
  const response = await f;
  console.log(`baseFetchRequest header ${url} => `, response.headers);
  return await response.json();
};
