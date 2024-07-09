import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: boolean;
}

const initialLoginState: LoginState = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { logIn, logOut, setLoginStatus } = loginSlice.actions;

export const selectLoginStatus = (state: { login: LoginState }) => state.login.isLoggedIn;

export default loginSlice.reducer;
