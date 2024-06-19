"use client";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/store";
import { selectDarkMode, toggleDarkMode } from '../../../../store/slice/themeSlice';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const darkMode = useSelector(selectDarkMode);

  const handleToggle = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    dispatch(toggleDarkMode());
  };

  return (
    <button onClick={handleToggle} className="p-2 bg-gray-200 dark:bg-gray-800">
      {darkMode ? "라이트 모드로 변경" : "다크 모드로 변경"}
    </button>
  );
};

export default ThemeToggle;
