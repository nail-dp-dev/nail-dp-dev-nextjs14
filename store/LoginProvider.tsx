'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, selectLoginStatus } from './slice/loginSlice';
import { useRouter } from 'next/navigation';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const status = useSelector(selectLoginStatus);
  
  useEffect(() => {

    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const authCookie = cookies.find(cookie => cookie.startsWith('Authorization='));

    if (authCookie) {
      dispatch(logIn())
    } else {
      dispatch(logOut())
    }

  }, [dispatch, status, router]);


  return <>{children}</>;
};

export default LoginProvider;
