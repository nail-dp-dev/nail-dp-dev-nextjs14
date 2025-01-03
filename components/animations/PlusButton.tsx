'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { archiveArray, IconPlusButtonProps } from '../../constants/interface';
import {
  selectArchiveModalStatus,
  setArchivePost,
  setCommonModal,
  setPlusState,
  setStarState,
  setArchivePage,
  selectCommonModalStatus,
} from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from '../../public/assets/svg/puls-icon.svg';
import MinusIcon from '../../public/assets/svg/minus-icon.svg';
import ArchiveMenu from '../../public/assets/svg/archive-modal-menu.svg';
import ArchivePlus from '../../public/assets/svg/archive-plus-icon.svg';
import ArchivePurplePlus from '../../public/assets/svg/archive-plus-purple-icon.svg';
import { getArchiveData } from '../../api/archive/getArchiveData';
import Video from '../ui/Video';
import Image from 'next/image';
import { postSetArchive } from '../../api/archive/postSetArchive';
import { useParams, usePathname } from 'next/navigation';
import { deletePostArchive } from '../../api/archive/deletePostArchive';
import { getPostArchive } from '../../api/archive/getPostArchive';
import NoArchiveImage from '../../public/assets/svg/no-archive.svg';
import NoArchiveFont from '../../public/assets/svg/no-archive-font.svg';

export default function PlusButton({
  postId,
  width,
  height,
  isClicked,
  active,
  className,
}: IconPlusButtonProps) {
  const [isClick, setIsClick] = useState(isClicked);
  const [isBackGround, setIsBackGround] = useState(isClicked);
  const [isAnimate, setIsAnimate] = useState(false);
  const { ArchivePostId, postState, starState } = useSelector(
    selectArchiveModalStatus,
  );
  const dispatch = useDispatch();
  const [isArchiveDate, setIsArchiveData] = useState<archiveArray[]>([]);
  const [isLading, setLading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isCursorId, setIsCursorId] = useState(0);
  const { archiveId } = useParams<{ archiveId: string }>();
  const { isCommonModalShow } = useSelector(selectCommonModalStatus);
  const [isTrueArray, setIsTrueArray] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const pathname = usePathname();

  const archiveData = async () => {
    const data = await getArchiveData();

    let content = data.data.postSummaryList.content;
    setIsCursorId(data.data.cursorId);
    setIsLastPage(data.data.postSummaryList.last);
    if ((content[0] && content.length < 4) || content.length === 0) {
      console.log(content);
      content = [...content, ...Array(4 - content.length).fill([])];
      setIsArchiveData(content);
      setIsTrueArray(false);
    } else if (content.length >= 4) {
      setIsArchiveData(content);
      //4개 이상 만들기 가능할때 true로 변경
      setIsTrueArray(false);
    } else {
      console.log('에러');
    }
  };

  const archiveSet = async (archiveId: number) => {
    const data = await postSetArchive(postId, archiveId);
    if (data.code === 2001) {
      dispatch(setPlusState({ state: false }));
      dispatch(setArchivePost({ postId: 0 }));
      console.log('a');
      setIsClick(true);
      setIsAnimate(true);
      setTimeout(() => {
        setIsBackGround(true);
      }, 300);
      // alert(data.message);
    } else {
      alert(data.message);
    }
  };

  // 클릭 핸들러
  const buttonClick = async () => {
    dispatch(setArchivePost({ postId: postId }));
    if (isClick && archiveId) {
      const data = await deletePostArchive([+archiveId], postId);
      if (data.code === 2001) {
        dispatch(setPlusState({ state: false }));
        setIsClick(false);
        setIsAnimate(false);
        setTimeout(() => {
          setIsBackGround(false);
        }, 300);
        dispatch(setArchivePost({ postId: 0 }));
      } else {
        console.log('에러');
      }
    } else if (!isClick && archiveId) {
      const data = await postSetArchive(postId, +archiveId);
      if (data.code === 2001) {
        dispatch(setPlusState({ state: false }));
        setIsClick(true);
        setIsAnimate(true);
        setTimeout(() => {
          setIsBackGround(true);
        }, 300);
        dispatch(setArchivePost({ postId: 0 }));
      } else {
        console.log('에러');
      }
    } else if (isClick) {
      dispatch(
        setStarState(
          postId === ArchivePostId ? { state: !starState } : { state: true },
        ),
      );
      dispatch(setPlusState({ state: false }));
    } else if (!isClick) {
      dispatch(
        setPlusState(
          postId === ArchivePostId ? { state: !postState } : { state: true },
        ),
      );
      postId !== ArchivePostId && archiveData();
    } else {
      console.log('에러');
    }
  };

  const plusButtonClick = () => {
    !postState && archiveData();
    dispatch(setArchivePost({ postId: postId }));
    dispatch(
      setPlusState(
        postId === ArchivePostId ? { state: !postState } : { state: true },
      ),
    );
    dispatch(setArchivePage({ state: 'archiveCreate' }));
  };

  const minusButtonClick = () => {
    dispatch(setArchivePage({ state: 'deletePost' }));
    dispatch(setPlusState({ state: false }));
    dispatch(setCommonModal('archive'));
  };

  const modalOpen = () => {
    if (!active) {
      return;
    }
    dispatch(setPlusState({ state: false }));
    dispatch(setCommonModal('archive'));
    dispatch(setArchivePage({ state: 'archiveCreate' }));
    dispatch(
      setPlusState(
        postId === ArchivePostId ? { state: !postState } : { state: true },
      ),
    );
  };

  const archiveScrollData = async () => {
    setLading(false);
    const archiveData = await getArchiveData(isCursorId);
    setIsCursorId(archiveData.data.cursorId);
    setIsLastPage(archiveData.data.postSummaryList.last);
    setIsArchiveData((prevData) => [
      ...prevData,
      ...archiveData.data.postSummaryList.content,
    ]);
    setLading(true);
  };

  useEffect(() => {
    function handleScroll() {
      const element = document.getElementById('scroll');
      if (element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        if (
          scrollTop + clientHeight >= scrollHeight * 0.8 &&
          isLading &&
          !isLastPage &&
          postId == ArchivePostId
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
  }, [ArchivePostId, isLading, isLastPage]);

  useEffect(() => {
    if (postId === ArchivePostId) {
      archiveData();
      postArchive();
    }
  }, [isCommonModalShow]);

  const postArchive = async () => {
    if (!isCommonModalShow) {
      const data = await getPostArchive(postId);
      if (!data.data.postSummaryList.content[0]) {
        dispatch(setPlusState({ state: false }));
        setIsClick(false);
        setIsAnimate(false);
        setTimeout(() => {
          setIsBackGround(false);
        }, 300);
        dispatch(setArchivePost({ postId: 0 }));
      } else {
        dispatch(setPlusState({ state: false }));
        setIsClick(true);
        setIsAnimate(true);
        setTimeout(() => {
          setIsBackGround(true);
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (pathname && pathname.includes('post')) {
      setIsPlus(true);
    }
  }, []);

  return (
    <div
      className={`buttonPlus absolute bottom-0 right-0 w-full ${className} z-50`}
    >
      <button
        onClick={buttonClick}
        className={`absolute bottom-1 right-2 z-[12] transition-all duration-500 lg:bottom-2 lg:right-2`}
      >
        <div className={`width='${width}' height='${height}'`}>
          <motion.svg
            width={width}
            height={height}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={
              isAnimate ? { scale: isClick ? [1, 1.2, 1, 1] : [1, 1.2, 1] } : {}
            }
            transition={{ duration: 0.3, delay: 0.3 }}
            style={{
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <circle
              cx="12.5"
              cy="12"
              r="12"
              fill={isBackGround ? 'white' : '#B98CE0'}
            />
            <motion.path
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 12C21 12.4142 20.6642 12.75 20.25 12.75H12.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V12.75H3.75C3.33579 12.75 3 12.4142 3 12C3 11.5858 3.33579 11.25 3.75 11.25H11.25V3.75C11.25 3.33579 11.5858 3 12 3C12.4142 3 12.75 3.33579 12.75 3.75V11.25H20.25C20.6642 11.25 21 11.5858 21 12Z"
              initial={isAnimate ? { scale: isClick ? 1 : 0 } : {}}
              animate={{ scale: isClick ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            {isAnimate || isBackGround ? (
              <motion.path
                fill="#B98CE0"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.75 24C10.5409 16.0003 8.74969 14.2091 0.75 12C8.74969 9.79094 10.5409 7.99969 12.75 0C14.9591 7.99969 16.7503 9.79094 24.75 12C16.7503 14.2091 14.9591 16.0003 12.75 24Z"
                initial={isAnimate ? { scale: isClick ? 0 : 1 } : {}}
                animate={{ scale: isClick ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isClick ? 0.3 : 0 }}
              />
            ) : (
              <></>
            )}
          </motion.svg>
        </div>
      </button>
      <button
        className={`absolute z-10 transition-all duration-500 ${postId === ArchivePostId && starState && isClick ? `${isPlus ? 'bottom-12 right-1 lg:bottom-14 lg:right-2' : 'bottom-7 right-1 lg:bottom-10 lg:right-2 xl:bottom-14'}` : 'bottom-2 right-2 opacity-0'}`}
        onClick={(e) => plusButtonClick()}
      >
        <PlusIcon width={`${width}`} hanging={`${height}`} />
      </button>
      <button
        className={`absolute z-10 transition-all duration-500 ${postId === ArchivePostId && starState && isClick ? `${isPlus ? 'bottom-1 right-12 lg:bottom-2 lg:right-14' : 'bottom-1 right-7 lg:bottom-2 lg:right-10 xl:right-14'}` : 'bottom-2 right-2 opacity-0'}`}
        onClick={(e) => minusButtonClick()}
      >
        <MinusIcon width={`${width}`} hanging={`${height}`} />
      </button>
      {postState && ArchivePostId === postId && (
        <div
          className={`absolute ${isClick ? `${isPlus ? 'bottom-[5.5rem] mr-[6px] xl:bottom-[6rem]' : 'bottom-[3rem] lg:bottom-[4.5rem] xl:bottom-[6rem]'}` : 'bottom-6 lg:bottom-9'} right-0 z-10 min-h-[69px] w-[calc(100%-24px)] min-w-[202px] lg:mr-[6px] xl:mr-[12px]`}
        >
          <div
            id="scroll"
            className="z-11 absolute bottom-[1.11rem] mt-[1px] flex min-h-[50px] w-full justify-center overflow-y-auto rounded-[20px] bg-white py-[3px]"
          >
            <div className="flex w-full items-center justify-center px-[8px] py-[5px]">
              {isArchiveDate.map((item, index) =>
                item.archiveId == null ? (
                  <div
                    key={`archive-add-${index}`}
                    className="group relative m-[2.5px] my-[5px] aspect-square w-[22.5%] xl:w-[24%]"
                  >
                    <ArchivePlus />
                    <button
                      onClick={(e) => modalOpen()}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-[8px] bg-addFolderGray group-hover:scale-110 group-hover:bg-purple">
                        <div className="relative h-[30%] w-[30%] rounded-full bg-white">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-[80%] w-[1px] rounded-full bg-purple"></div>
                            <div className="absolute h-[1px] w-[80%] rounded-full bg-purple"></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : (item.archiveImgUrl &&
                    item.archiveImgUrl.endsWith('.mov')) ||
                  (item.archiveImgUrl &&
                    item.archiveImgUrl.endsWith('.mp4')) ? (
                  <button
                    key={`archive-video-${item.archiveId}`}
                    className="relative mx-[2.5px] my-[5px] aspect-square w-[22.5%] overflow-hidden rounded-[8px] bg-lightGray"
                    onClick={(e) => archiveSet(item.archiveId)}
                  >
                    <div
                      className={`absolute left-0 top-0 z-10 h-full w-full rounded-[8px] hover:border-[2px] hover:border-purple hover:bg-purple/20`}
                    ></div>
                    <Video
                      src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${item.archiveImgUrl}`}
                      width={'100'}
                      height={'100'}
                    />
                  </button>
                ) : item.archiveImgUrl ? (
                  <button
                    key={`archive-image-${item.archiveId}`}
                    className={`relative mx-[2.5px] my-[5px] aspect-square w-[22.5%] overflow-hidden rounded-[8px]`}
                    onClick={(e) => archiveSet(item.archiveId)}
                  >
                    <div
                      className={`absolute left-0 top-0 z-10 h-full w-full rounded-[8px] hover:border-[2px] hover:border-purple hover:bg-purple/20`}
                    ></div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${item.archiveImgUrl}`}
                      alt="postImage"
                      fill
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      sizes="100vw, 50vw, 33vw"
                      quality={100}
                    />
                  </button>
                ) : (
                  <div
                    key={`no-archive-${index}`}
                    className={`group relative m-[2.5px] my-[5px] aspect-square w-[22%] ${item.archiveImgUrl ? 'hidden' : ''}`}
                  >
                    <button
                      onClick={(e) => archiveSet(item.archiveId)}
                      className="relative flex items-center justify-center overflow-hidden rounded-[8px] bg-noArchiveColor hover:border-[2px] hover:border-purple group-hover:scale-110"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <NoArchiveImage className="absolute" />
                      <NoArchiveFont className="absolute translate-y-[10px]" />
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <ArchiveMenu />
          </div>
        </div>
      )}
    </div>
  );
}
