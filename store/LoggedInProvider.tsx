'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../app/loading';
import { getCookieValid } from '../api/auth/validation/getCookieValid';


const LoggedInProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCookieValid(dispatch)
    setLoading(false);
  }, [dispatch]);
  if (loading) {
    return <Loading/>;
  }
  return <>{children}</>;
};

export default LoggedInProvider;
