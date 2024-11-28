import localStorage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import counterReducer from "./features/counter.slice";

const counterPersistConfig = {
  key: "counter",
  storage: localStorage,
  whitelist: ["value"],
};

export const rootReducer = combineReducers({
  counter: persistReducer(counterPersistConfig, counterReducer),
});

export * from "./features/counter.slice";
