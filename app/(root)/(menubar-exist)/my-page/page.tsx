'use client';

import PostBox from '../../../../components/boxes/PostBox';
import PostCreate from '../../../../components/animations/PostCreateIcon';
import { useEffect, useState } from 'react';
import UserImage from '../../../../components/ui/UserImage';
import UserInfo from '../../../../components/ui/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsData } from '../../../../api/post/getPostsData';
import { getPostsTempData } from '../../../../api/post/getPostsTempData';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import useLoggedInUserData from '../../../../hooks/user/useLoggedInUserData';
import {
  decreaseBoxes,
  increaseBoxes,
  selectNumberOfBoxes,
} from '../../../../store/slices/boxLayoutSlice';
import { postData, tempData } from '../../../../constants/interface';
import HeartButton from '../../../../components/animations/HeartButton';
import { myPageCategoryElements, postBoxWidths } from '../../../../constants';
import MinusSVG from '../../../../public/assets/svg/minus.svg';
import PlusSVG from '../../../../public/assets/svg/plus.svg';
import ExclamationMark from '../../../../public/assets/svg/exclamation-mark.svg';
import SpeechBubble from '../../../../public/assets/svg/speech-bubble.svg';
import { RootState } from '../../../../store/store';
import { useRouter } from 'next/navigation';
import Loading from '../../../loading';

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
  const [isCategory, setIsCategory] = useState('myPost');
  const [sharedCount, setSharedCount] = useState<number>(0);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isExclamationMark, setIsExclamationMark] = useState(false);
  const [isHeartMark, setIsHeartMark] = useState(false);
  const layoutNum = useSelector(selectNumberOfBoxes);
  const dispatch = useDispatch();
  const router = useRouter();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );

  const handleTempClick = async () => {
    if (isLoggedIn === 'loggedOut') {
      return;
    }
    router.push(`/post/edit/${isTempData[0].postId}`);
  };

  const categoryClick = (e: any, category: string) => {
    e.stopPropagation();
    setIsCategory(category);
  };

  const explanationClick = (str: string) => {
    if (str == 'heart') {
      setIsHeartMark(true);
      setTimeout(() => {
        setIsHeartMark(false);
      }, 2000);
    } else {
      setIsExclamationMark(true);
      setTimeout(() => {
        setIsExclamationMark(false);
      }, 2000);
    }
  };

  const explanationEnter = (str: string) => {
    if (str == 'heart') {
      setIsHeartMark(true);
    } else {
      setIsExclamationMark(true);
    }
  };

  const explanationLeave = (str: string) => {
    if (str == 'heart') {
      setIsHeartMark(false);
    } else {
      setIsExclamationMark(false);
    }
  };

  const fetchPostData = async () => {
    if (userData) {
      const postData = await getPostsData(userData.data.nickname);
      setIsNickname(userData.data.nickname);
      setIsLastPage(postData.data.postSummaryList.last);
      setIsCursorId(postData.data.cursorId);
      setIsMyPageData(postData.data.postSummaryList.content);
      setIsPostsLoading(true);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 10_000) {
      return (count / 10_000).toFixed(1).replace(/\.0$/, '') + 'm';
    } else if (count >= 1_000) {
      return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
  };

  const fetchPostTempData = async () => {
    const tempData = await getPostsTempData();
    if (tempData.data !== null) {
      setIsTempData([tempData.data]);
    }
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
        console.log(scrollHeight);

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

  console.log(userData?.data.followingCount);

  return isPostsLoading ? (
    <div
      id="scroll1"
      className={`relative h-full overflow-y-scroll scrollbar-hide`}
    >
      {isLoggedIn === 'loggedIn' && userData && (
        <div className="flex min-h-[160px] items-center">
          <UserImage
            src={userData.data.profileUrl}
            alt="프로필이미지"
            width={80}
            height={80}
          />

          <div className="ml-[16px] flex-1 ">
            <UserInfo
              nickname={userData.data.nickname}
              postsCount={formatCount(userData.data.postsCount)}
              saveCount={formatCount(userData.data.saveCount)}
              followerCount={formatCount(userData.data.followerCount)}
              followCount={formatCount(userData.data.followingCount ?? 0)}
              hoverStyle=""
              nicknameStyle="text-[14px] md:text-[22px] font-bold"
              statsStyle="font-normal text-[11px] md:text-[14px]"
            />
          </div>
        </div>
      )}
      <div className={`sticky top-0 z-[17] w-full bg-white`}>
        <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
          <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
            <div className="flex h-[53px]  gap-[20px] xs:gap-[20px] md:gap-[32px]">
              {myPageCategoryElements.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      categoryClick(e, item.desc);
                    }}
                    className={`inline-flex h-[100%] items-center justify-center transition-all ${isCategory === item.desc ? 'border-purple' : 'border-navMenuBotSolidGray'} border-b-[3px]`}
                  >
                    <p className="text-[14px] font-[700]">{item.name}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-[20px] xs:gap-[20px] md:gap-[32px]">
              <div className="flex">
                {isExclamationMark && (
                  <p className="pr-[5px] text-darkPurple xs:hidden">
                    비공개 처리된 게시물은 표시되지 않습니다.
                  </p>
                )}
                <button
                  className="hidden xs:hidden lg:flex"
                  onClick={(e) => explanationClick('exclamation-mark')}
                  onMouseEnter={(e) => explanationEnter('exclamation-mark')}
                  onMouseLeave={(e) => explanationLeave('exclamation-mark')}
                >
                  <ExclamationMark
                    width={24}
                    hanging={24}
                    fill={`${isExclamationMark ? '#B98CE0' : '#E0DEE3'}`}
                  />
                </button>
              </div>
              <button
                onClick={() => dispatch(increaseBoxes())}
                disabled={numberOfBoxes >= 7}
                className="h-[24px] xs:hidden"
              >
                <MinusSVG />
              </button>
              <button
                onClick={() => dispatch(decreaseBoxes())}
                disabled={numberOfBoxes <= 3}
                className="h-[24px] xs:hidden"
              >
                <PlusSVG />
              </button>
              {isLoggedIn === 'loggedIn' && (
                <div
                  onClick={(e) => explanationClick('heart')}
                  onMouseEnter={(e) => explanationEnter('heart')}
                  onMouseLeave={(e) => explanationLeave('heart')}
                >
                  <HeartButton
                    width="29"
                    height="24"
                    isClicked={false}
                    isGetAllLiked={true}
                  />
                </div>
              )}
              {isHeartMark && (
                <div className="absolute bottom-14 right-1 hidden xs:hidden lg:flex">
                  <div className="relative">
                    <SpeechBubble />
                    <p className="absolute bottom-[10px] px-[12px] text-[11px] text-darkPurple">
                      내 게시물에서 좋아하는 게시물을 보여줍니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-[13px] w-full"></div>
        </div>
      </div>
      {isCategory === 'myPost' && (
        <div className="MyPageContainer max-h-full ">
          <div className="outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all">
            <PostCreate />
            {isTempData.length > 0 &&
              (isTempData[0] !== undefined ? (
                <PostBox
                  postId={isTempData[0].postId}
                  photoId={isTempData[0].photoId}
                  photoUrl={isTempData[0].photoUrl}
                  saved={false}
                  createdDate={'temp'}
                  tempPost={true}
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  setSharedCount={setSharedCount}
                  boundary={isTempData[0].boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                  isOptional={true}
                  showOnlyShareButton={false}
                />
              ) : (
                <div
                  className="box relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px] transition-all duration-500 hover:border-purple"
                  style={{ width: postBoxWidths[layoutNum] }}
                  onClick={handleTempClick}
                >
                  <div className="absolute flex h-full w-full flex-col justify-center bg-lightGray">
                    <p className="z-10 text-center text-[16px] ">
                      임시저장된 게시물
                    </p>
                  </div>
                </div>
              ))}
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
                      isOptional={true}
                      showOnlyShareButton={false}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
      )}
      {isCategory === 'reservation' && (
        <div className="flex h-full w-full flex-col justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
            <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
            <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
          </div>
        </div>
      )}
      {isCategory === 'buy' && (
        <div className="flex h-full w-full flex-col justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
            <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
            <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
