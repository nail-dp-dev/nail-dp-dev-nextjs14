import React from 'react';

type UserInfoProps = {
  nickname: string;
  postsCount?: number;
  saveCount?: number;
  followerCount?: number;
  followCount?: number;
  hoverStyle?: string;
  nicknameStyle?: string;
  statsStyle?: string;
  isMenuBar?: boolean;
  children?: React.ReactNode;
};

// 사용자 정보(게시물/저장됨/팔로워/팔로잉) 공통UI
export default function UserInfo({
  nickname,
  postsCount,
  saveCount,
  followerCount,
  followCount,
  hoverStyle,
  nicknameStyle,
  statsStyle,
  children,
  isMenuBar,
}: UserInfoProps) {
  return (
    <div className="flex-1 flex-col items-start hidden md:flex">
      <div className="flex w-full items-center justify-between">
        <p
          className={`${nicknameStyle} ${hoverStyle} ${isMenuBar && 'font-[500]'}`}
        >
          {nickname}
        </p>
        {children}
      </div>
      <div
        className={`flex flex-wrap gap-2 text-darkPurple  ${statsStyle} ${hoverStyle} ${isMenuBar && 'text-[0.875rem] font-[400]'}`}
      >
        {postsCount !== undefined && <span>게시물 {postsCount}</span>}
        {saveCount !== undefined && <span>저장됨 {saveCount}</span>}
        {followerCount !== undefined && <span>팔로워 {followerCount}</span>}
        {followCount !== undefined && <span>팔로잉 {followCount}</span>}
      </div>
    </div>
  );
}
