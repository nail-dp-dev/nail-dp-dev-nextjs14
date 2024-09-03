'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { archiveArray, IconPlusButtonProps } from '../../constants/interface';
import {
  selectArchiveModalStatus,
  setArchivePost,
  setCommonModal,
  setPlusState,
  setStarState,
  setArchivePage,
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

export default function PlusButton({
  postId,
  width,
  height,
  isClicked,
  active,
}: IconPlusButtonProps) {
  const [isClick, setIsClick] = useState(isClicked);
  const [isBackGround, setIsBackGround] = useState(isClicked);
  const [isAnimate, setIsAnimate] = useState(false);
  const { ArchivePostId, postState, starState } = useSelector(
    selectArchiveModalStatus,
  );
  const dispatch = useDispatch();
  const [isArchiveDate, setIsArchiveData] = useState<archiveArray[]>([]);

  const archiveData = async () => {
    const data = await getArchiveData();
    let content = data.data.postSummaryList.content;
    console.log(content);

    if (content[0]) {
      content = [...content, ...Array(4 - content.length).fill([])];
      setIsArchiveData(content);
    } else if (content.length < 4) {
      content = [...content, ...Array(4 - content.length).fill([])];
      setIsArchiveData(content);
    } else {
      console.log('에러');
    }
  };

  const archiveSet = async (archiveId: number) => {
    const data = await postSetArchive(postId, archiveId);
    if (data.code === 2001) {
      dispatch(setPlusState({ state: false }));
      setIsClick(true);
      setIsAnimate(true);
      setTimeout(() => {
        setIsBackGround(true);
      }, 300);
      dispatch(setArchivePost({ postId: 0 }));
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  // 클릭 핸들러
  const buttonClick = () => {
    if (isClick) {
      dispatch(setArchivePost({ postId: postId }));
      dispatch(
        setStarState(
          postId === ArchivePostId ? { state: !starState } : { state: true },
        ),
      );
      dispatch(setPlusState({ state: false }));
    } else if (!isClick) {
      dispatch(setArchivePost({ postId: postId }));
      console.log(postId);
      console.log(ArchivePostId);
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
    dispatch(setPlusState({ state: false }));
    dispatch(setCommonModal('archive'));
    dispatch(setArchivePage({ state: 'deletePost' }));
  };

  const modalOpen = () => {
    if (!active) {
      return;
    }
    dispatch(setPlusState({ state: false }));
    dispatch(setCommonModal('archive'));
  };

  return (
    <div className="absolute bottom-0 right-0 w-full">
      <button
        onClick={buttonClick}
        className="absolute bottom-2 right-2 z-[12] transition-all duration-500"
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
        className={`absolute z-10 transition-all duration-500 ${postId === ArchivePostId && starState && isClick ? 'bottom-10 right-2' : 'bottom-2 right-2'}`}
        onClick={(e) => plusButtonClick()}
      >
        <PlusIcon width={`${width}`} hanging={`${height}`} />
      </button>
      <button
        className={`absolute z-10 transition-all duration-500 ${postId === ArchivePostId && starState && isClick ? 'bottom-2 right-10' : 'bottom-2 right-2'}`}
        onClick={(e) => minusButtonClick()}
      >
        <MinusIcon width={`${width}`} hanging={`${height}`} />
      </button>
      {postState && ArchivePostId === postId && (
        <div
          className={`absolute ${isClick ? 'bottom-[4.5rem]' : 'bottom-9'} right-0 z-10 mr-[6px] min-h-[69px] w-[calc(100%-12px)] min-w-[202px]`}
        >
          <div className="z-11 absolute bottom-[1.11rem] mt-[1px] min-h-[50px] w-full overflow-hidden rounded-[20px] bg-red">
            <div className="flex w-full items-center justify-center">
              {isArchiveDate.map((item, index) =>
                item.archiveImgUrl == null ? (
                  <div key={index} className="group relative m-[2.5px]">
                    <ArchivePlus />
                    <button
                      onClick={(e) => modalOpen()}
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <ArchivePurplePlus className="scale-110" />
                    </button>
                  </div>
                ) : item.archiveImgUrl.endsWith('.mov') ||
                  item.archiveImgUrl.endsWith('.mp4') ? (
                  <button
                    key={index}
                    className="relative mx-[2.5px] my-[5px] aspect-square w-[20%] overflow-hidden rounded-[8px] bg-lightGray"
                    onClick={(e) => archiveSet(item.archiveId)}
                  >
                    <div
                      className={`absolute left-0 top-0 z-10 h-full w-full rounded-[8px] hover:border-[2px] hover:border-purple hover:bg-purple/20`}
                    ></div>
                    <Video
                      src={item.archiveImgUrl}
                      width={'100'}
                      height={'100'}
                    />
                  </button>
                ) : (
                  <button
                    key={index}
                    className="relative m-[2.5px] aspect-square w-[20%] overflow-hidden rounded-[8px]"
                    onClick={(e) => archiveSet(item.archiveId)}
                  >
                    <div
                      className={`absolute left-0 top-0 z-10 h-full w-full rounded-[8px] hover:border-[2px] hover:border-purple hover:bg-purple/20`}
                    ></div>
                    <Image
                      src={item.archiveImgUrl}
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
