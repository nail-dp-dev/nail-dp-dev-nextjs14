'use client';

import { useSelector } from 'react-redux';
import PostBox from '../../../../../components/boxes/PostBox';
import UserImage from '../../../../../components/ui/UserImage';
import UserInfo from '../../../../../components/ui/UserInfo';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';
import { getProfileData } from '../../../../../api/profile/getProfileData';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { postData, profileData } from '../../../../../constants/interface';
import CategoryBar from '../../../../../components/bars/CategoryBar';
import { ProfileElements } from '../../../../../constants';
import { getProfilePost } from '../../../../../api/profile/getProfilePost';
import { getProfileArchive } from '../../../../../api/profile/getProfileArchive';
import useLoggedInUserData from '../../../../../hooks/user/useLoggedInUserData';

export default function ProfilePage() {
  const { userData } = useLoggedInUserData();
  const isLoggedIn = useSelector(selectLoginStatus);
  const { nickname } = useParams<{ nickname: string }>();
  const [isProfile, setIsProfile] = useState<profileData>();
  const [isCategory, setIsCategory] = useState('post');
  const [isPost, setIsPost] = useState<postData[]>();
  const [isPostLost, setIsPostLost] = useState();
  const [isPostCursorId, setIsCursorId] = useState();
  const [isArchive, setIsArchive] = useState();
  const router = useRouter()

  const profileData = async () => {
    const response = await getProfileData(nickname);
    setIsProfile(response.data);
  };
  const profilePostData = async () => {
    const postData = await getProfilePost(nickname);
    console.log(postData);
    setIsPostLost(postData.data.postSummaryList.last);
    setIsCursorId(postData.data.cursorId);
    setIsPost(postData.data.postSummaryList.content);
  };
  const profileArchiveData = async () => {
    const archiveData = await getProfileArchive(nickname);
    console.log(archiveData);
    setIsArchive;
  };

  const message = () => {};

  const follow = () => {};

  useEffect(() => {
    if (userData?.data.nickname === nickname) {
      router.push('/my-page');
    }
    profileData();
    profilePostData();
    profileArchiveData();
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
            <button
              onClick={(e) => follow()}
              className="mr-[12px] h-[32px] w-[84px] rounded-full border-2 border-purple bg-purple text-white hover:bg-white hover:text-purple"
            >
              팔로우
            </button>
            <button
              onClick={(e) => message()}
              className="mr-[12px] h-[32px] w-[84px] rounded-full border-2 border-black bg-black text-white hover:bg-white hover:text-black"
            >
              메세지
            </button>
          </div>
        </div>
      )}
      <div className={`sticky top-0 z-30 w-full bg-white`}>
        <CategoryBar
          elements={ProfileElements}
          category={isCategory}
          setCategory={setIsCategory}
        />
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        >
          {/* {isCategory == 'post' && isPost && isPost.map((item, index) => {

          })} */}
        </div>
      </div>
    </div>
  );
}
