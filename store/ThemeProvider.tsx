'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode, setDarkMode } from './slice/themeSlice';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initialDarkMode = localStorage.getItem('darkMode') === 'true';
    dispatch(setDarkMode(initialDarkMode));
    setIsMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (isMounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, isMounted]);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ThemeProvider;
