'use client';

import { useSelector } from 'react-redux';
import PostBox from '../../../../../components/boxes/PostBox';
import UserImage from '../../../../../components/ui/UserImage';
import UserInfo from '../../../../../components/ui/UserInfo';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';
import { getProfileData } from '../../../../../api/profile/getProfileData';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface profileData {
  followerCount: number;
  followingCount: number;
  followingStatus: boolean;
  nickname: string;
  point: null;
  postsCount: number;
  profileUrl: string;
  saveCount: number;
}

export default function ProfilePage() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const { nickname } = useParams<{ nickname: string }>();
  const [isProfile, setIsProfile] = useState<profileData>();

  const profileData = async () => {
    console.log(nickname);
    const response = await getProfileData(nickname);
    setIsProfile(response.data);
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <div className={`relative h-full overflow-y-scroll scrollbar-hide`}>
      {isLoggedIn === 'loggedIn' && isProfile && (
        <div className="flex min-h-[160px] items-center">
          <UserImage
            src={isProfile.profileUrl}
            alt="프로필이미지"
            width={128}
            height={128}
          />
          <div className="ml-[16px] flex-1">
            <UserInfo
              nickname={isProfile.nickname}
              postsCount={isProfile.postsCount}
              saveCount={isProfile.saveCount}
              followerCount={isProfile.followerCount}
              followCount={isProfile.followingCount}
              hoverStyle=""
              nicknameStyle="text-[22px] font-bold"
              statsStyle="text-sm font-normal"
            />
          </div>
          <div>
            <button className="mr-[12px] h-[32px] w-[84px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple">
              팔로우
            </button>
            <button className="mr-[12px] h-[32px] w-[84px] rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black">
              메세지
            </button>
          </div>
        </div>
      )}
      <div className={`sticky top-0 z-30 w-full bg-white`}>
        {/* 여기수정 */}
        {/* <CategoryBar elements={myPageCategoryElements} /> */}
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        ></div>
      </div>
    </div>
  );
}
