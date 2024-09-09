'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import LessThan from '../../../../../../public/assets/svg/less-than.svg';
import MinusSVG from '../../../../../../public/assets/svg/minus.svg';
import PlusSVG from '../../../../../../public/assets/svg/plus.svg';
import { postData } from '../../../../../../constants/interface';
import {
  decreaseBoxes,
  increaseBoxes,
  selectNumberOfBoxes,
} from '../../../../../../store/slices/boxLayoutSlice';
import { RootState } from '../../../../../../store/store';
import { selectLoginStatus } from '../../../../../../store/slices/loginSlice';
import PostBox from '../../../../../../components/boxes/PostBox';
import { getArchiveSelectData } from '../../../../../../api/archive/getArchiveSelectData';
import HeartButton from '../../../../../../components/animations/HeartButton';

export default function ProfileArchive() {
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const isLoggedIn = useSelector(selectLoginStatus);
  const [sharedCount, setSharedCount] = useState<number>(0);
  const { archiveId } = useParams<{ archiveId: string }>();
  const [isPost, setIsPost] = useState<postData[]>([]);
  const [isArchiveName, setIsArchiveName] = useState('');
  const [isNickName, setIsNickName] = useState('');
  const [isCursorId, setIsCursorId] = useState(0);
  const [isLading, setIsLading] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );

  const archiveData = async () => {
    const archiveData = await getArchiveSelectData(archiveId);
    console.log(archiveData);
    setIsPost(archiveData.data.postSummaryList.content);
    setIsArchiveName(archiveData.data.archiveName);
    setIsCursorId(archiveData.data.cursorId);
    setIsLast(archiveData.data.postSummaryList.last);
    setIsNickName(archiveData.data.nickname);
  };

  const profileMove = () => {
    router.push(`/profile/${isNickName}`);
  };

  const archiveScrollData = async () => {
    setIsLading(false);
    if (!isLast) {
      const archiveData = await getArchiveSelectData(archiveId, isCursorId);
      console.log(archiveData);
      {
        archiveData.data.postSummaryList.content[0] &&
          setIsCursorId(archiveData.data.cursorId);
        setIsLast(archiveData.data.postSummaryList.last);
        setIsPost((prevData) => [
          ...prevData,
          ...archiveData.data.postSummaryList.content,
        ]);
      }

      setIsLading(true);
    }
  };

  useEffect(() => {
    function handleScroll() {
      const element1 = document.getElementById('scroll');
      if (element1) {
        const scrollTop = element1.scrollTop;
        const scrollHeight = element1.scrollHeight;
        const clientHeight = element1.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight * 0.8 && isLading) {
          archiveScrollData();
        }
      }
    }

    const scrollElement = document.getElementById('scroll');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [isLading, isCursorId]);

  useEffect(() => {
    archiveData();
  }, []);

  return (
    <div id="scroll" className="CreatePostContainer overflow-y-scroll">
      <div className="flex flex-col items-center">
        {isNickName && (
          <button
            onClick={profileMove}
            className="flex h-[72px] w-full flex-row items-center pl-[14px]"
          >
            <LessThan />
            <p className="pl-[14px] text-[28px] font-bold">
              {isNickName}님의 아카이브
            </p>
          </button>
        )}
        <div className={`sticky top-0 z-30 w-full bg-white`}>
          <div className="flex h-[54px] w-full items-center justify-between border-b-[1px] border-b-navBotSolidGray">
            <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
              <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
                <div className="flex h-[53px] gap-[32px]">
                  <button
                    className={`inline-flex h-[100%] min-w-[30px] items-center justify-center border-b-[3px] border-purple transition-all`}
                  >
                    <p className="text-[14px] font-[700]">{isArchiveName}</p>
                  </button>
                </div>
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
              </div>
              <div className="h-[13px] w-full"></div>
            </div>
          </div>
        </div>
        <div className="MyPageContainer max-h-full w-full">
          <div
            className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
          >
            {isPost[0] ? (
              isPost.map((item, index) => (
                <PostBox
                  key={index}
                  postId={item.photoId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  saved={item.saved}
                  createdDate={item.createdDate}
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  setSharedCount={setSharedCount}
                  boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                  isOptional={false}
                />
              ))
            ) : (
              <div className="flex h-[300px] w-full items-center justify-center rounded-xl bg-lightGray">
                <p className="text-darkModeGray text-[35px]">
                  표시할 게시물이 없어요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
