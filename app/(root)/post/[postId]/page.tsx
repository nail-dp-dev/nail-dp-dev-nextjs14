'use client';

import React from 'react';
import TopContainer from './components/TopContainer';
import MidContainer from './components/MidContainer';
import BotContainer from './components/BotContainer';
import useUser from '../../../../hooks/useUser';

export default function PostDetailPage() {
  const user = useUser();

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <TopContainer user={user} />
      <MidContainer />
      <BotContainer />
    </>
  );
}
