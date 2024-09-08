'use client';

import { useDispatch, useSelector } from 'react-redux';
import PostBox from '../../../../../components/boxes/PostBox';
import UserImage from '../../../../../components/ui/UserImage';
import UserInfo from '../../../../../components/ui/UserInfo';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';
import { getProfileData } from '../../../../../api/profile/getProfileData';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  archiveArray,
  postData,
  profileData,
} from '../../../../../constants/interface';
import { postBoxWidths, ProfileElements } from '../../../../../constants';
import { getProfilePost } from '../../../../../api/profile/getProfilePost';
import { getProfileArchive } from '../../../../../api/profile/getProfileArchive';
import ArchiveBox from '../../../../../components/boxes/ArchiveBox';
import ListIcon from '../../../../../public/assets/svg/my-archive-list.svg';
import AlbumIcon from '../../../../../public/assets/svg/my-archive-album.svg';
import MinusSVG from '../../../../../public/assets/svg/minus.svg';
import PlusSVG from '../../../../../public/assets/svg/plus.svg';
import PrivateArchive from '../../../../../public/assets/img/privateArchive.png';
import HeartButton from '../../../../../components/animations/HeartButton';
import {
  decreaseBoxes,
  increaseBoxes,
  selectNumberOfBoxes,
} from '../../../../../store/slices/boxLayoutSlice';
import { RootState } from '../../../../../store/store';
import { followUser, unFollowUser } from '../../../../../api/user/followUser';
import { getUserData } from '../../../../../api/user/getUserData';
import Image from 'next/image';

export default function ProfilePage() {
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const isLoggedIn = useSelector(selectLoginStatus);
  const [showType, setShowType] = useState('album');
  const [sharedCount, setSharedCount] = useState<number>(0);
  const { nickname } = useParams<{ nickname: string }>();
  const [isProfile, setIsProfile] = useState<profileData>();
  const [isFollowCount, setIsFollowCount] = useState(0);
  const [isFollowState, setIsFollowState] = useState(false);
  const [isCategory, setIsCategory] = useState('post');
  const [isPost, setIsPost] = useState<postData[]>([]);
  const [isPostLast, setIsPostLast] = useState(false);
  const [isArchiveLast, setIsArchiveLast] = useState(false);
  const [isPostCursorId, setIsPostCursorId] = useState(0);
  const [isArchiveCursorId, setIsArchiveCursorId] = useState(0);
  const [isLading, setLading] = useState(true);
  const [isArchive, setIsArchive] = useState<archiveArray[]>([]);
  const layoutNum = useSelector(selectNumberOfBoxes);
  const router = useRouter();
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );
  const decodedNickname = decodeURIComponent(nickname);

  const profileData = async () => {
    const profileData = await getProfileData(nickname);
    console.log(profileData);
    setIsProfile(profileData.data);
    setIsFollowCount(profileData.data.followerCount);
    setIsFollowState(profileData.data.followingStatus);
  };

  const profilePostData = async () => {
    const postData = await getProfilePost(nickname);
    console.log(postData.data.cursorId);
    if (postData.data.postSummaryList.content[0]) {
      setIsPostLast(postData.data.postSummaryList.last);
      setIsPostCursorId(postData.data.cursorId);
      setIsPost(postData.data.postSummaryList.content);
    }
  };

  const profileArchiveData = async () => {
    const archiveData = await getProfileArchive(nickname);
    if (archiveData.data.postSummaryList.content[0]) {
      setIsArchiveLast(archiveData.data.postSummaryList.last);
      setIsArchiveCursorId(archiveData.data.cursorId);
      setIsArchive(archiveData.data.postSummaryList.content);
    }
  };

  const categoryClick = (e: any, category: string) => {
    e.stopPropagation();
    setIsCategory(category);
    console.log(category);
  };

  const clickShowType = (e: any, type: string) => {
    e.stopPropagation();
    setShowType(type);
  };

  const message = () => {
    alert('준비중입니다.');
  };

  const follow = async () => {
    if (isFollowState) {
      const success = await unFollowUser(isProfile!.nickname);
      if (success) {
        setIsFollowCount(isFollowCount - 1);
        setIsFollowState(false);
      }
    } else {
      const success = await followUser(isProfile!.nickname);
      if (success) {
        setIsFollowCount(isFollowCount + 1);
        setIsFollowState(true);
      }
    }
  };

  const checkNickName = async () => {
    const data = await getUserData();
    console.log(data.data.nickname, decodedNickname);
    if (data.data.nickname === decodedNickname) {
      router.push('/my-page');
    }
  };

  const boxStyle = {
    width: showType === 'album' ? postBoxWidths[layoutNum] : '49.65%',
  };

  const postScrollData = async () => {
    setLading(false);
    if (!isPostLast) {
      console.log(isPostCursorId);
      const postData = await getProfilePost(nickname, isPostCursorId);
      console.log(postData, isArchiveCursorId);
      {
        postData.data.postSummaryList.content[0] &&
          setIsPostCursorId(postData.data.cursorId);
        setIsPostLast(postData.data.postSummaryList.last);
        setIsPost((prevData) => [
          ...prevData,
          ...postData.data.postSummaryList.content,
        ]);
      }

      setLading(true);
    }
  };

  const archiveScrollData = async () => {
    setLading(false);
    if (!isArchiveLast) {
      const archiveData = await getProfileArchive(nickname, isArchiveCursorId);
      console.log(archiveData);
      {
        archiveData.data.postSummaryList.content[0] &&
          setIsArchiveCursorId(archiveData.data.cursorId);
        setIsArchiveLast(archiveData.data.postSummaryList.last);
        setIsArchive((prevData) => [
          ...prevData,
          ...archiveData.data.postSummaryList.content,
        ]);
      }

      setLading(true);
    }
  };

  useEffect(() => {
    function handleScroll() {
      const element1 = document.getElementById('scroll');
      if (element1) {
        const scrollTop = element1.scrollTop;
        const scrollHeight = element1.scrollHeight;
        const clientHeight = element1.clientHeight;

        if (
          scrollTop + clientHeight >= scrollHeight * 0.8 &&
          isLading &&
          !isPostLast
        ) {
          postScrollData();
        } else if (
          scrollTop + clientHeight >= scrollHeight * 0.8 &&
          isLading &&
          !isArchiveLast
        ) {
          archiveScrollData();
        }
      }
    }

    const scrollElement = document.getElementById('scroll');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [isLading, layoutNum, isPostCursorId, isArchiveCursorId]);

  useEffect(() => {
    checkNickName();
    profileData();
    profilePostData();
    profileArchiveData();
  }, []);

  return (
    <div
      id="scroll"
      className={`relative h-full overflow-y-scroll scrollbar-hide`}
    >
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
              followCount={isFollowCount}
              hoverStyle=""
              nicknameStyle="text-[22px] font-bold"
              statsStyle="text-sm font-normal"
            />
          </div>
          <div>
            <button
              onClick={(e) => follow()}
              className={`mr-[12px] h-[32px] w-[84px] rounded-full border-2 ${isFollowState ? 'border-darkPurple bg-white text-darkPurple hover:bg-darkPurple hover:text-white' : 'border-purple bg-purple text-white hover:bg-white hover:text-purple'}`}
            >
              {isFollowState ? '팔로잉' : '팔로우'}
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
        <div className="flex h-[54px] w-full items-center justify-between border-b-[1px] border-b-navBotSolidGray">
          <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
            <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
              <div className="flex h-[53px] gap-[32px]">
                {ProfileElements.map((item, index) => {
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
              {isCategory === 'post' && (
                <div className="flex items-center gap-[32px]">
                  <button
                    onClick={() => dispatch(increaseBoxes())}
                    disabled={numberOfBoxes >= 7}
                    className="h-[24px]"
                  >
                    <MinusSVG />
                  </button>
                  <button
                    onClick={() => dispatch(decreaseBoxes())}
                    disabled={numberOfBoxes <= 3}
                    className="h-[24px]"
                  >
                    <PlusSVG />
                  </button>
                  {isLoggedIn === 'loggedIn' && (
                    <HeartButton
                      width="29"
                      height="24"
                      isClicked={false}
                      isGetAllLiked={true}
                    />
                  )}
                </div>
              )}
              {isCategory === 'Archive' && (
                <div className="flex items-center gap-[10px]">
                  <button
                    onClick={(e) => {
                      clickShowType(e, 'album');
                    }}
                  >
                    <AlbumIcon
                      fill={`${showType === 'album' ? '#756982' : '#DADADA'}`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      clickShowType(e, 'list');
                    }}
                  >
                    <ListIcon
                      fill={`${showType === 'list' ? '#756982' : '#DADADA'}`}
                    />
                  </button>
                </div>
              )}
            </div>
            {isCategory !== 'Archive' && (
              <div className="h-[13px] w-full"></div>
            )}
          </div>
        </div>
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        >
          {isCategory == 'post' &&
            isPost &&
            isPost.map((item, index) => (
              <PostBox
                key={index}
                postId={item.postId}
                photoId={item.photoId}
                photoUrl={item.photoUrl}
                saved={item.saved}
                createdDate={item.createdDate}
                setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                setSharedCount={setSharedCount}
                boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                isOptional={false}
              />
            ))}
          {isCategory == 'Archive' &&
            (isArchive[0] ? (
              isArchive.map((item, index) =>
                item.boundary == 'FOLLOW' && !isFollowState ? (
                  <div
                    key={index}
                    className={` relative mb-[30px] flex ${showType === 'album' && 'flex-col '} ${showType === 'list' && 'h-[72px] items-center justify-center gap-[16px] pl-[25px] pr-[16px]'}`}
                    style={boxStyle}
                  >
                    <div
                      className={`flex h-full w-full ${showType === 'album' && 'flex-col items-center gap-[20px]'} justify-between ${showType === 'list' && 'cursor-pointer items-center rounded-2xl  px-[16px] hover:bg-chatChooseButton'} z-0`}
                    >
                      <div
                        className={`box bg-lightGray ${showType === 'list' && 'h-[56px] w-[56px]'} ${showType === 'album' && 'aspect-auto w-full	 transition-all duration-500 hover:border-purple'} relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px]`}
                      >
                        <div className={`inset-0 z-0 h-full w-full`}>
                          <Image
                            src={PrivateArchive}
                            alt={''}
                            id={item.archiveId.toString()}
                            fill
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                            }}
                            quality={100}
                            sizes="100vw, 50vw, 33vw"
                            blurDataURL="https://image-component.nextjs.gallery/placeholder"
                            placeholder="blur"
                          />
                        </div>
                      </div>
                      <div className="flex h-full w-full flex-col items-start justify-center px-[10px]">
                        <p className="text-[1rem] font-[700] text-textBlack">
                          {item.archiveName}
                        </p>
                        <p className="text-text text-[0.875rem] font-[400]">
                          {item.postCount} designs{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ArchiveBox
                    key={index}
                    showType={showType}
                    archiveId={item.archiveId}
                    photoId={index}
                    photoUrl={item.archiveImgUrl}
                    saved={false}
                    createdDate={undefined}
                    archiveName={item.archiveName}
                    postCount={item.postCount}
                    initialBoundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                    category={isCategory}
                  />
                ),
              )
            ) : (
              <div className="flex h-[300px] w-full items-center justify-center rounded-xl bg-lightGray">
                <p className="text-darkModeGray text-[35px]">
                  표시할 아카이브가 없어요.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
