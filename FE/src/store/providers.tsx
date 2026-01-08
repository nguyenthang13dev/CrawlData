"use client";
import { setApiStore } from "@/services";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

export function Providers({ children }: { children: any }) {
  useEffect(() => {
    // Set store cho ApiService để có thể dispatch logout
    setApiStore(store);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
