import { IBaseResponse } from "@/interfaces/api.interface";

export const fetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  const result = await baseFetchRequest<IBaseResponse<T>>(url, init);
  console.log("result", result);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
};

export const baseFetchRequest = async <T = any>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  return await response.json();
};
