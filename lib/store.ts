import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from './features/example/exampleSlice';

export const store = () => {
  return configureStore({
    reducer: {
      // slice
      example: exampleSlice,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
