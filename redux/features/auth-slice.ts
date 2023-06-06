import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EAuthState, IAuthInfo } from "@/interfaces/auth.interface";

const initialState: IAuthInfo = {
  state: EAuthState.PENDING,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: () => {
      return { ...initialState, state: EAuthState.LOGOUT };
    },
    updateUser: (state, action: PayloadAction<Partial<IAuthInfo>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateUser, resetUser } = authSlice.actions;
