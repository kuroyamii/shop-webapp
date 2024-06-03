"use client";
import { store, StoreType } from "@/lib/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreType>();
  // Check if the redux store is already referred
  if (!storeRef.current) {
    // Refer to new store
    storeRef.current = store;
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
