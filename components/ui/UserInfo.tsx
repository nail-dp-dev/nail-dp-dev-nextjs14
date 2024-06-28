import React from 'react';

type UserInfoProps = {
  nickname: string;
  postsCount: number;
  saveCount: number;
  followerCount: number;
  followCount?: number;
  children?: React.ReactNode;
};

export default function UserInfo({
  nickname,
  postsCount,
  saveCount,
  followerCount,
  followCount,
  children,
}: UserInfoProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        <p className="font-[500] text-[16px] text-textBlack">{nickname}</p>
        {children}
      </div>
      <div className="flex flex-row gap-[10px] text-darkPurple text-sm font-normal">
        <span>게시물 {postsCount}</span>
        <span>저장됨 {saveCount}</span>
        <span>팔로워 {followerCount}</span>
        {followCount !== undefined && <span>팔로우 {followCount}</span>}
      </div>
    </div>
  );
}
