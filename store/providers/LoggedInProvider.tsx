'use client';

import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCookieValid } from '../../api/auth/validation/getCookieValid';
import { getCookie } from '../../lib/getCookie';
import { logIn, logOut } from '../slices/loginSlice';
import { usePathname } from 'next/navigation';

const LoggedInProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const checkCookie = useCallback(async () => {
    const cookie = getCookie('Authorization');
    if (cookie) {
      await getCookieValid(dispatch);
      dispatch(logIn());
    } else {
      dispatch(logOut());
    }
  }, [dispatch]);

  useEffect(() => {
    // 최초 로드 시 쿠키 확인
    checkCookie();
  }, [checkCookie]);
  
  useEffect(() => {
    // URL이 '/'일 때 쿠키 확인
    if (pathname === '/') {
      checkCookie();
    }
  }, [pathname, checkCookie]);

  return <>{children}</>;
};

export default LoggedInProvider;
