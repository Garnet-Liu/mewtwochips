export interface IBaseResponse<T> {
  code: number;
  message: string;
  success: boolean;
  data: T
}
