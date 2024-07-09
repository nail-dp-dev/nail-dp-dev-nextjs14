import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: string;
}

const initialLoginState: LoginState = {
  isLoggedIn: 'pending',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = 'loggedIn';
    },
    logOut: (state) => {
      state.isLoggedIn = 'loggedOut';
    },
  },
});

export const { logIn, logOut } = loginSlice.actions;

export const selectLoginStatus = (state: { login: LoginState }) => state.login.isLoggedIn;

export default loginSlice.reducer;
