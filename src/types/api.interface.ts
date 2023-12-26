export interface IBaseResponse<T = void> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
