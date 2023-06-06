import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { authSlice } from "@/redux/features/auth-slice";
import { pokemonApi } from "@/redux/features/pokemon-slice";
import { counterSlice } from "@/redux/features/counter-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      counter: counterSlice.reducer,
      // Add the generated reducer as a specific top-level slice
      [pokemonApi.reducerPath]: pokemonApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware)
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;
