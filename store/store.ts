import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import loginReducer from './slices/loginSlice';
import boxLayoutReducer from './slices/boxLayoutSlice';
import commonModalReducer from './slices/modalSlice';
import getLikedPostsReducer from './slices/getLikedPostsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      login: loginReducer,
      boxLayout: boxLayoutReducer,
      commonModal: commonModalReducer,
      likedPosts: getLikedPostsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;