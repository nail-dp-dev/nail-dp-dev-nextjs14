import React from 'react';
import UserInfo from '../../ui/UserInfo';
import UserImage from '../../ui/UserImage';
import { followData } from '../../../constants/example';

export default function SearchFollow() {
  return (
    <div className="h-[340px] flex flex-wrap justify-between pr-32 overflow-auto">
      {followData.map((user) => (
        <div key={user.data.userId} className="flex flex-wrap p-3">
          <UserImage
            src={user.data.photo_url}
            alt={`${user.data.nickname}'s profile`}
            width={40}
            height={40}
          />
          <div className="ml-4">
            <UserInfo
              nickname={user.data.nickname}
              postsCount={user.data.postsCount}
              saveCount={user.data.saveCount}
              followerCount={user.data.followerCount}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
