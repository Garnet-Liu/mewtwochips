import { env } from "../../env.mjs";
import { IBaseResponse } from "@/types/api.interface";

export const apiFetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  const result = await baseFetchRequest<IBaseResponse<T>>(
    `${env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    init,
  );
  if (result.success) {
    return result.data;
  } else {
    console.log(result);
    throw new Error(result.message);
  }
};

export const baseFetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  return await response.json();
};
