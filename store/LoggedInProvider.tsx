'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../app/loading';
import { getCookieValid } from '../api/auth/validation/getCookieValid';
import { getCookie } from '../lib/getCookie';
import { logOut } from './slice/loginSlice';


const LoggedInProvider = ({ children }: { children: React.ReactNode}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCookie = async () => {
      const cookie = getCookie('Authorization');
      if (cookie) {
        getCookieValid(dispatch);
      } else {
        dispatch(logOut())
      }
      setLoading(false);
    };

    checkCookie();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  
  return <>{children}</>;
};

export default LoggedInProvider;
