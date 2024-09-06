'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookieValid } from '../../api/auth/validation/getCookieValid';
import { getCookie } from '../../lib/getCookie';
import { logOut } from '../slices/loginSlice';

const LoggedInProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const checkCookie = async () => {
    const cookie = getCookie('Authorization');
    if (cookie) {
      await getCookieValid(dispatch);
    } else {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return <>{children}</>;
};

export default LoggedInProvider;
