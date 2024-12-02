import localStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import gobangReducer from "./gobang.slice";
import counterReducer from "./features/counter.slice";

const counterPersistConfig = {
  key: "counter",
  storage: localStorage,
  whitelist: ["value"],
};

export const rootReducer = combineReducers({
  gobang: gobangReducer,
  counter: persistReducer(counterPersistConfig, counterReducer),
});

export * from "./features/counter.slice";
export * from "./gobang.slice";
