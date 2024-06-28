import React from 'react';
import UserInfo from '../../ui/UserInfo';
import UserImage from '../../ui/UserImage';
import { followData } from '../../../constants/example';

export default function SearchFollow() {
  return (
    <div
      className="max-h-[210px] mt-6  flex flex-col flex-wrap overflow-auto snap-y overflow-x-hidden
        xs:max-h-[410px]
        sm:max-h-[410px]
        md:max-h-[340px]
        lg:max-h-[275px]
        xl:max-h-[275px]
        2xl:max-h-[210px]
        3xl:max-h-[210px]"
    >
      <div className="flex flex-wrap ">
        {followData.map((user) => (
          <div
            key={user.data.userId}
            className="w-1/3 p-1 
              xs:w-full 
              sm:w-full 
              md:w-full 
              lg:w-1/2 
              xl:w-1/2  
              2xl:w-1/3 
              3xl:w-1/4"
          >
            <button
              className="group w-[310px] flex items-center p-2 rounded-2xl 
                active:bg-opacity-10 active:bg-darkPurple button-tr snap-end "
            >
              <div className="group-hover:brightness-75 button-tr">
                <UserImage
                  src={user.data.photo_url}
                  alt={`${user.data.nickname}'s profile`}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <UserInfo
                  nickname={user.data.nickname}
                  postsCount={user.data.postsCount}
                  saveCount={user.data.saveCount}
                  followerCount={user.data.followerCount}
                  hoverStyle="group-hover:text-orange button-tr"
                  nicknameStyle="text-base font-medium "
                  statsStyle="text-sm font-normal"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
