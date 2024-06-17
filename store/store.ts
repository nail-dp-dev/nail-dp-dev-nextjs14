import { configureStore } from "@reduxjs/toolkit";
import slice from './slice';

export const store = () => {
  return configureStore({
    reducer: {
      // slice
      example: slice,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
