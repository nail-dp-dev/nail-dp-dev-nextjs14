import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import loginReducer from "./slice/loginSlice"
import boxLayoutReducer from "./slice/boxLayoutSlice"
import { useDispatch } from "react-redux";

export const store = () => {
  return configureStore({
    reducer: {
      // slice
      theme: themeReducer,
      login: loginReducer,
      boxLayout: boxLayoutReducer,
    },
  });
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();