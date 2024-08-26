import React from 'react';
import UserInfo from '../../ui/UserInfo';
import UserImage from '../../ui/UserImage';
import { useRouter } from 'next/navigation';

type SearchNicknameProps = {
  searchTerm: string;
  onTagClick: (tag: string) => void;
  followData: any[];
};

// 사용자 검색 결과 컴포넌트
export default function SearchNickname({
  searchTerm,
  onTagClick,
  followData,
}: SearchNicknameProps) {
  const router = useRouter();

  const filteredFollow =
    searchTerm.startsWith('@') && searchTerm.length > 1
      ? followData.filter(
          (user) =>
            user.data.nickname
              .toLowerCase()
              .includes(searchTerm.slice(1).toLowerCase()) ||
            searchTerm
              .slice(1)
              .toLowerCase()
              .includes(user.data.nickname.toLowerCase()),
        )
      : [];

  const handleProfileClick = (nickname: string) => {
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
            key={user.data.nickname}
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
              onClick={() => handleProfileClick(user.data.nickname)}
            >
              <div className="button-tr group-hover:brightness-75">
                <UserImage
                  src={user.data.profileUrl}
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
