'use client';

import React from 'react';
import TopContainer from './components/TopContainer';
import MidContainer from './components/MidContainer';
import BotContainer from './components/BotContainer';
import usePostDetail from '../../../../hooks/usePostDetail';

export default function PostDetailPage() {
  const userDetail = usePostDetail();

  if (!userDetail) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="hide-scrollbar overflow-auto">
      <TopContainer user={userDetail.post} />
      <MidContainer />
      <BotContainer userDetail={userDetail} />
    </div>
  );
}
