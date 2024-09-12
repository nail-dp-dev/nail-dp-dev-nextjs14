import React from 'react';
import UserInfo from '../../ui/UserInfo';
import UserImage from '../../ui/UserImage';
import { useRouter } from 'next/navigation';
import { UserSearchData } from '../../../types/dataType';

type SearchNicknameProps = {
  searchTerm: string;
  onTagClick: (tag: string) => void;
  followData: UserSearchData[];
  onProfileClick: (nickname: string) => void;
};

// 닉네임 검색 결과
export default function SearchNickname({
  searchTerm,
  onTagClick,
  followData,
  onProfileClick,
}: SearchNicknameProps) {
  const router = useRouter();

  const filteredFollow =
    searchTerm.length > 0
      ? followData.filter((user) => {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          const userNickname = user.nickname?.toLowerCase() || '';
          if (searchTerm.startsWith('@')) {
            return userNickname.includes(lowerCaseSearchTerm.slice(1));
          } else {
            return userNickname.includes(lowerCaseSearchTerm);
          }
        })
      : [];

  const handleProfileClick = (nickname: string) => {
    onProfileClick(nickname);
    router.push(`/profile/${nickname}`);
  };

  return (
    <div
      className="flex max-h-[210px] snap-y flex-col flex-wrap overflow-auto overflow-x-hidden
        xs:max-h-[410px]
        sm:max-h-[410px]
        md:max-h-[340px]
        lg:max-h-[275px]
        xl:max-h-[275px]
        2xl:max-h-[210px]
        3xl:max-h-[210px]"
    >
      <div className="flex flex-wrap">
        {filteredFollow.map((user) => (
          <div
            key={user.nickname}
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
              className="nickname-wrap button-tr group flex w-[310px] snap-end items-center 
                rounded-2xl p-2 active:bg-darkPurple active:bg-opacity-10"
              onClick={() => handleProfileClick(user.nickname)}
            >
              <div className="button-tr group-hover:brightness-75">
                <UserImage
                  src={user.profileUrl}
                  alt={`${user.nickname}'s profile`}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <UserInfo
                  nickname={user.nickname}
                  postsCount={user.postCount}
                  saveCount={user.savedPostCount}
                  followerCount={user.followerCount}
                  hoverStyle="group-hover:text-orange button-tr"
                  nicknameStyle="text-base font-medium"
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
