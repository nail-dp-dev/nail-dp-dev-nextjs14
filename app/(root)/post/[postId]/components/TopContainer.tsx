import React, { useState } from 'react';
import UserImage from '../../../../../components/ui/UserImage';
import UserInfo from '../../../../../components/ui/UserInfo';
import { PostsDetailData } from '../../../../../types/dataType';

interface userProps {
  user: PostsDetailData['data'];
}

export default function TopContainer({ user }: userProps) {
  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  const [isFollowing, setIsFollowing] = useState(user.followingStatus);
  const [followerCount, setFollowerCount] = useState(user.followerCount);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div
      className="flex  snap-y snap-end flex-wrap
      items-center justify-between bg-white  p-2"
    >
      <div className="wrap-left flex flex-wrap items-center gap-4 ">
        <UserImage
          src={user.profileUrl}
          alt={`${user.nickname}'s profile`}
          width={56}
          height={56}
        />

        <div className="wrap-info pb-2 leading-3">
          <UserInfo
            nickname={user.nickname}
            nicknameStyle="text-base font-medium"
            statsStyle="text-14px-normal-dP"
          />
          <span className="text-14px-normal-dP">{followerCount} 팔로워</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`button-layout px-[22.5px] py-[5.5px] 
            ${
              isFollowing
                ? 'border-2 border-darkPurple bg-white text-darkPurple'
                : 'button-color'
            }`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        </div>
      </div>
      <div className="wrap-right flex flex-wrap">
        <button className="button-layout button-color px-[22.5px] py-[5.5px]">
          게시글 설정
        </button>
        <button className="button-layout button-color ml-4 px-[22.5px] py-[5.5px]">
          게시글 수정
        </button>
      </div>
    </div>
  );
}
