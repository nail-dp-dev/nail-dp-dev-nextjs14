'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDarkMode,
  toggleDarkMode,
} from '../../../../store/slice/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  //"Text content does not match server-rendered HTML" 오류를 방지
  // 주석 지울 예정
  if (!isMounted) {
    return null;
  }

  return (
    <button onClick={handleToggle} className="p-2 bg-gray-200 dark:bg-gray-800">
      {darkMode ? '라이트 모드로 변경' : '다크 모드로 변경'}
    </button>
  );
};

export default ThemeToggle;
