import { UserInfo } from "@firebase/auth";

export interface IAuthInfo {
  state: EAuthState;
  userInfo: IUserInfo | null;
}

export interface IUserInfo extends UserInfo {
  token: string;
  emailVerified: boolean;
}

export enum EAuthState {
  PENDING = "pending",
  LOGOUT = "logout",
  LOGIN = "login"
}
