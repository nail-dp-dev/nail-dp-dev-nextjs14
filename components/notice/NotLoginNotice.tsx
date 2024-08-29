'use client';

import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import useLoggedInUserData from '../../hooks/user/useLoggedInUserData';
import { selectLoginStatus } from '../../store/slices/loginSlice';
import LoginSuggestModal from '../modal/mini/LoginSuggestModal';

interface NotLoginNoticeProps {
  children: ReactNode;
}

export default function NotLoginNotice({ children }: NotLoginNoticeProps) {
  const isLoggedIn = useSelector(selectLoginStatus);
  const { userData } = useLoggedInUserData();

  if (isLoggedIn !== 'loggedIn' || !userData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="text-xl font-bold">로그인이 필요한 페이지입니다</h2>
        <LoginSuggestModal />
      </div>
    );
  }

  return <>{children}</>;
}
