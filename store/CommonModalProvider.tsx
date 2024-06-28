'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from './slice/modalSlice';

const CommonModalProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectCommonModalStatus);
  
  useEffect(() => {
  }, [dispatch, status]);


  return <>{children}</>;
};

export default CommonModalProvider;
