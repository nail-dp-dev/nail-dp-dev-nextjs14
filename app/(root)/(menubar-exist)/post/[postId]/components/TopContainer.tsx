import React, { useState, useEffect } from 'react';
import UserImage from '../../../../../../components/ui/UserImage';
import UserInfo from '../../../../../../components/ui/UserInfo';
import { PostsDetailData } from '../../../../../../types/dataType';
import Link from 'next/link';
import useLoggedInUserData from '../../../../../../hooks/user/useLoggedInUserData';
import { useRouter } from 'next/navigation';
import {
  followUser,
  unFollowUser,
  getFollowerCount,
} from '../../../../../../api/user/followUser';

interface userProps {
  user: PostsDetailData['data'];
  postId: number;
}

export default function TopContainer({ user, postId }: userProps) {
  const { userData } = useLoggedInUserData();
  const [isFollowing, setIsFollowing] = useState(user.followingStatus);
  const [followerCount, setFollowerCount] = useState<number | null>(
    user.followerCount,
  );
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData && userData.data.nickname === user.nickname) {
      setIsOwner(true);
    }
  }, [userData, user.nickname]);

  useEffect(() => {
    const fetchFollowerCount = async () => {
      try {
        const count = await getFollowerCount(user.nickname);
        setFollowerCount(count);
      } catch (error) {
        console.error('Error fetching follower count:', error);
        setFollowerCount(null);
      }
    };

    fetchFollowerCount();
  }, [user.nickname]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      const success = await unFollowUser(user.nickname);
      if (success) {
        setFollowerCount((prev) => (prev !== null ? prev - 1 : null));
        setIsFollowing(false);
      }
    } else {
      const success = await followUser(user.nickname);
      if (success) {
        setFollowerCount((prev) => (prev !== null ? prev + 1 : null));
        setIsFollowing(true);
      }
    }
  };

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }
  //프로필 이동
  const test = (nickname: string) => {
    if (nickname !== undefined) {
      localStorage.setItem("name",nickname)
      router.push(`/profile/${nickname}`);
    }
    console.log('에러');
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-2">
      <div className="wrap-left flex flex-wrap items-center gap-4">
        <div
          className="cursor-pointer"
          onClick={(e) => test(user.nickname)}
        >
          <UserImage
            src={user.profileUrl}
            alt={`${user.nickname}'s profile`}
            width={56}
            height={56}
          />
        </div>

        <div className="wrap-info pb-2 leading-3 ">
          <UserInfo
            nickname={user.nickname}
            nicknameStyle="text-base font-medium"
            statsStyle="text-14px-normal-dP"
          />
          {followerCount !== null ? (
            <span className="text-14px-normal-dP">{followerCount} 팔로워</span>
          ) : (
            <span className="text-14px-normal-dP">
              팔로워 수를 불러올 수 없습니다.
            </span>
          )}
        </div>

        {!isOwner && (
          <div className="flex flex-wrap gap-2">
            <button
              className={`button-layout px-[22.5px] py-[5.5px] ${
                isFollowing
                  ? 'border-2 border-darkPurple bg-white text-darkPurple'
                  : 'button-color hover:button-hover active:button-click'
              }`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? '팔로잉' : '팔로우'}
            </button>
          </div>
        )}
      </div>
      <div className="wrap-right flex flex-wrap">
        {isOwner && (
          <>
            <Link href={`/post/edit/${postId}`}>
              <button className="button-layout button-color hover:button-hover active:button-click ml-4 px-[22.5px] py-[5.5px]">
                게시글 수정
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
