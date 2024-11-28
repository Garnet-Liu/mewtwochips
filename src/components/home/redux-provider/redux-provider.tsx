"use client";

import { PersistGate } from "redux-persist/integration/react";
import { Persistor, persistStore } from "redux-persist";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

import { Spin } from "@/components/spin";
import { AppStore, makeStore } from "@/redux-store/store";

interface Props {
  children: ReactNode;
}

export function ReduxProvider({ children }: Readonly<Props>) {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>();

  if (!storeRef.current || !persistorRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<Spin loading={true} className="h-screen" />}
        persistor={persistorRef.current}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
