export interface IBaseResponse<T = void> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

export const apiFetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  console.log("api fetch request => window", window === undefined ? "server" : "client");
  const result = await baseFetchRequest<IBaseResponse<T>>(url, init);
  if (result.success) {
    return result.data;
  } else {
    console.log("=========== apiFetchRequest ===========");
    console.log(result);
    throw new Error(result.message);
  }
};

export const baseFetchRequest = async <T = void>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  return await response.json();
};
