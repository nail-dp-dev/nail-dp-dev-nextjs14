'use client';

import PostBox from '../../../components/boxes/PostBox';
import PostCreate from '../../../components/animations/PostCreateIcon';
import CategoryBar from '../../../components/bars/CategoryBar';
import { myPageCategoryElements } from '../../../constants';
import { useEffect, useState } from 'react';
import UserImage from '../../../components/ui/UserImage';
import UserInfo from '../../../components/ui/UserInfo';
import useLoggedInUserData from '../../../hooks/auth/useLoggedInUserData';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slice/loginSlice';
import { getPostsData } from '../../../api/post/getPostsData';
import { getPostsTempData } from '../../../api/post/getPostsTempData';

interface postData {
  postId: number;
  photoId: number;
  photoUrl: string;
  isPhoto: boolean;
  isVideo: boolean;
  like: boolean;
  saved: boolean;
  createdDate: string;
}

interface tempData {
  isPhoto: boolean;
  isVideo: boolean;
  photoId: number;
  photoUrl: string;
  postId: number;
}

export default function MyPagePage() {
  const [isScroll, setIsScroll] = useState(false);
  const isLoggedIn = useSelector(selectLoginStatus);
  const { userData } = useLoggedInUserData();
  const [isTempData, setIsTempData] = useState<tempData[]>([]);
  const [isMyPageData, setIsMyPageData] = useState<postData[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (userData) {
        const postData = await getPostsData(userData.data.nickname);
        console.log(postData);
        setIsMyPageData(postData.data.postSummaryList.content);
      }
    };
    const fetchPostTempData = async () => {
      const tempData = await getPostsTempData();
      setIsTempData([tempData.data]);
    };

    fetchPostData();
    fetchPostTempData();
  }, [userData]);

  useEffect(() => {
    function handleScroll() {
      const element1 = document.getElementById('scroll1');
      if (element1) {
        const scrollTop = element1.scrollTop;

        if (scrollTop >= 160) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      }
    }

    const scrollElement = document.getElementById('scroll1');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      id="scroll1"
      className={`relative h-full overflow-y-scroll scrollbar-hide ${isScroll ? 'mt-[66px]' : ''}
      `}
    >
      {isLoggedIn === 'loggedIn' && userData && (
        <div className="flex min-h-[160px] items-center">
          <UserImage
            src={userData.data.profileUrl}
            alt="프로필이미지"
            width={128}
            height={128}
          />
          <div className="ml-[16px] flex-1">
            <UserInfo
              nickname={userData.data.nickname}
              postsCount={userData.data.postsCount}
              saveCount={userData.data.saveCount}
              followerCount={userData.data.followerCount}
              followCount={userData.data.folloingCount}
              hoverStyle=""
              nicknameStyle="text-[22px] font-bold"
              statsStyle="text-sm font-normal"
            />
          </div>
        </div>
      )}
      <div
        className={`${isScroll ? 'fixed top-[84px] z-30 w-[calc(100%_-_365px)] bg-white' : ''}`}
      >
        <CategoryBar elements={myPageCategoryElements} />
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        >
          <PostCreate />
          {isTempData &&
            isTempData.map((item, index) => {
              return (
                <PostBox
                  key={index}
                  postId={item.postId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  saved={false}
                  createdDate={null}
                  tempPost={true}
                />
              );
            })}
          {isMyPageData &&
            isMyPageData.map((item, index) => {
              return (
                <PostBox
                  key={index}
                  postId={item.postId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  like={item.like}
                  saved={item.saved}
                  createdDate={item.createdDate}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
