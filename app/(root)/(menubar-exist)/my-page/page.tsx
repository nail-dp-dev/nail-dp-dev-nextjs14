'use client';

import PostBox from '../../../../components/boxes/PostBox';
import PostCreate from '../../../../components/animations/PostCreateIcon';
import { useEffect, useState } from 'react';
import UserImage from '../../../../components/ui/UserImage';
import UserInfo from '../../../../components/ui/UserInfo';
import { useSelector } from 'react-redux';
import { getPostsData } from '../../../../api/post/getPostsData';
import { getPostsTempData } from '../../../../api/post/getPostsTempData';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import useLoggedInUserData from '../../../../hooks/user/useLoggedInUserData';
import { selectNumberOfBoxes } from '../../../../store/slices/boxLayoutSlice';
import { postData, tempData } from '../../../../constants/interface';

export default function MyPagePage() {
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const isLoggedIn = useSelector(selectLoginStatus);
  const { userData } = useLoggedInUserData();
  const [isTempData, setIsTempData] = useState<tempData[]>([]);
  const [isMyPageData, setIsMyPageData] = useState<postData[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isCursorId, setIsCursorId] = useState(0);
  const [isLading, setLading] = useState(true);
  const [isNickname, setIsNickname] = useState('');
  const [sharedCount, setSharedCount] = useState<number>(0);
  const layoutNum = useSelector(selectNumberOfBoxes);

  console.log(userData);
  
  const fetchPostData = async () => {
    if (userData) {
      const postData = await getPostsData(userData.data.nickname);
      setIsNickname(userData.data.nickname);
      setIsLastPage(postData.data.postSummaryList.last);
      setIsCursorId(postData.data.cursorId);
      setIsMyPageData(postData.data.postSummaryList.content);
    }
  };

  const fetchPostTempData = async () => {
    const tempData = await getPostsTempData();
    setIsTempData([tempData.data]);
  };

  const fetchPostScrollData = async () => {
    setLading(false);
    if (!isLastPage) {
      const postData = await getPostsData(isNickname, isCursorId, layoutNum);
      setIsCursorId(postData.data.cursorId);
      setIsLastPage(postData.data.postSummaryList.last);
      setIsMyPageData((prevData) => [
        ...prevData,
        ...postData.data.postSummaryList.content,
      ]);
      setLading(true);
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchPostTempData();
  }, [userData]);

  useEffect(() => {
    function handleScroll() {
      const element1 = document.getElementById('scroll1');
      if (element1) {
        const scrollTop = element1.scrollTop;
        const scrollHeight = element1.scrollHeight;
        const clientHeight = element1.clientHeight;

        if (
          scrollTop + clientHeight >= scrollHeight * 0.8 &&
          isLading &&
          !isLastPage
        ) {
          fetchPostScrollData();
        }
      }
    }

    const scrollElement = document.getElementById('scroll1');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [isNickname, isLading, isCursorId, layoutNum]);

  return (
    <div
      id="scroll1"
      className={`relative h-full overflow-y-scroll scrollbar-hide 
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
              followCount={userData.data.followingCount}
              hoverStyle=""
              nicknameStyle="text-[22px] font-bold"
              statsStyle="text-sm font-normal"
            />
          </div>
        </div>
      )}
      <div className={`sticky top-0 z-30 w-full bg-white`}>
        {/* 여기수정 */}
        {/* <CategoryBar elements={myPageCategoryElements} /> */}
      </div>
      <div className="MyPageContainer max-h-full ">
        <div className="outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all">
          <PostCreate />
          {isTempData[0] !== null &&
            isTempData.map((item, index) => {
              if (item && item.postId) {
                return (
                  <PostBox
                    key={index}
                    postId={item.postId}
                    photoId={item.photoId}
                    photoUrl={item.photoUrl}
                    saved={false}
                    createdDate={null}
                    tempPost={true}
                    setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                    setSharedCount={setSharedCount}
                    boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'} 
                  />
                );
              }
              return null;
            })}
          {isMyPageData &&
            isMyPageData.map((item, index) => {
              if (item && item.postId) {
                return (
                  <PostBox
                    key={index}
                    postId={item.postId}
                    photoId={item.photoId}
                    photoUrl={item.photoUrl}
                    like={item.like}
                    saved={item.saved}
                    createdDate={item.createdDate}
                    tempPost={false}
                    setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                    setSharedCount={setSharedCount}
                    boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'} 
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}
