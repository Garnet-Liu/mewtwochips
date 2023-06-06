import { UserInfo } from "@firebase/auth";

export interface IAuthInfo {
  state: EAuthState;
  userInfo: UserInfo | null;
}

export interface IUserInfo extends UserInfo {
  emailVerified: boolean;
}

export enum EAuthState {
  PENDING = "pending",
  LOGOUT = "logout",
  LOGIN = "login"
}
