import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "@/redux-store/reducer";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
