import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

// 로컬 스토리지에서 다크 모드 상태를 로드하는 함수
const loadDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('darkMode') === 'true';
  }
  return false;
};

// 로컬 스토리지에 다크 모드 상태를 저장하는 함수
const saveDarkMode = (darkMode: boolean): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', darkMode.toString());
  }
};

const initialState: ThemeState = {
  darkMode: loadDarkMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      saveDarkMode(state.darkMode);
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      saveDarkMode(state.darkMode);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;

export const selectDarkMode = (state: { theme: ThemeState }) =>
  state.theme.darkMode;

export default themeSlice.reducer;
