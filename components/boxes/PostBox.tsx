'use client';

import React, { useEffect, useState } from 'react';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Image from 'next/image';
import Video from '../ui/Video';
import Toggle from '../buttons/Toggle';
import GeneralAction from '../buttons/option-menu/GeneralAction';
import { PostBoxNewProps } from '../../constants/interface';
import { postBoxWidths } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../store/slices/boxLayoutSlice';
import { useGeneralAction } from '../../hooks/useGeneralAction';
import { postPostLike } from '../../api/post/postPostLike';
import { deletePostLike } from '../../api/post/deletePostLike';
import { selectLoginStatus } from '../../store/slices/loginSlice';
import { useRouter } from 'next/navigation';
import {
  setCommonModal,
  setArchivePost,
  setStarState,
  setPlusState,
} from '../../store/slices/modalSlice';
import { useVisibility } from '../../hooks/useVisibility';
import BoxCommonButton from '../ui/BoxCommonButton';

function PostBox({
  postId,
  photoId,
  photoUrl,
  like,
  saved,
  createdDate,
  tempPost,
  setIsSuggestLoginModalShow,
  setSharedCount,
  boundary: initialBoundary,
  isOptional,
  onLikeToggle,
  showOnlyShareButton,
}: PostBoxNewProps) {
  const router = useRouter();
  const isLoggedIn = useSelector(selectLoginStatus);
  const layoutNum = useSelector(selectNumberOfBoxes);

  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
  const { isVisible, handleDelete } = useVisibility();

  const [isLiked, setIsLiked] = useState(like);
  const [currentBoundary, setCurrentBoundary] = useState<
    'ALL' | 'FOLLOW' | 'NONE'
  >(initialBoundary);

  const dispatch = useDispatch();

  const handleHeartClick = async () => {
    if (isLoggedIn === 'loggedOut') {
      return;
    }

    if (!isLiked && isLoggedIn === 'loggedIn') {
      let data = await postPostLike(postId);
      data.code == 2001 && setIsLiked((prev) => !prev);
    } else if (isLiked && isLoggedIn === 'loggedIn') {
      let data = await deletePostLike(postId);
      data.code == 2001 && setIsLiked((prev) => !prev);
    }
  };

  const handleTempClick = async () => {
    if (isLoggedIn === 'loggedOut') {
      return;
    }
    router.push(`/post/edit/${postId}`);
  };

  const handlePostClick = (e: any, postId: number) => {
    e.stopPropagation();

    if (isLoggedIn === 'loggedOut') {
      setIsSuggestLoginModalShow(true);
    }

    if (isLoggedIn === 'loggedIn') {
      dispatch(setStarState({ state: false }));
      dispatch(setPlusState({ state: false }));
      router.push(`/post/${postId}`);
    }
  };

  const isPhoto =
    photoUrl.endsWith('.jpg') ||
    photoUrl.endsWith('.jpeg') ||
    photoUrl.endsWith('.png') ||
    photoUrl.endsWith('.gif');

  const isVideo = photoUrl.endsWith('.mp4') || photoUrl.endsWith('.mov');

  if (!isVisible) return null;

  return (
    <div
      ref={boxRef}
      className="group/button box relative flex items-center justify-center transition-all duration-500"
      style={{ width: postBoxWidths[layoutNum] }}
    >
      <button
        type="button"
        className="absolute inset-0 z-[9] flex items-center justify-center 
        overflow-hidden rounded-2xl border-[5px] border-transparent transition-all duration-500 group-hover/button:border-purple"
        onClick={(e) => {
          if (!tempPost) {
            handlePostClick(e, postId);
          }
        }}
      >
        {tempPost == true && (
          <>
            <div
              onClick={handleTempClick}
              className="absolute z-[9] h-full w-full cursor-pointer bg-darkPurple opacity-60"
            ></div>

            <p className="pointer-events-none z-[9] text-center text-white ">
              임시저장된 게시물
            </p>
          </>
        )}

        {isPhoto && (
          <Image
            src={photoUrl}
            alt={createdDate}
            id={photoId.toString()}
            fill
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            quality={100}
            sizes="100vw, 50vw, 33vw"
            blurDataURL="https://image-component.nextjs.gallery/placeholder"
            placeholder="blur"
          />
        )}

        {isVideo && <Video src={photoUrl} width="100%" height="100%" />}
      </button>
      <button
        onClick={handleHeartClick}
        className="absolute right-4 top-4 z-10 group-hover/button:border-purple"
      >
        <HeartButton
          width="21px"
          height="19px"
          isClicked={isLiked}
          active={isLoggedIn === 'loggedIn'}
        />
      </button>
      <div className="absolute bottom-2 right-2 z-10 group-hover/button:border-purple">
        <PlusButton
          postId={postId}
          width="24px"
          height="24px"
          isClicked={saved}
          active={isLoggedIn === 'loggedIn'}
        />
      </div>
      {isOptional && (
        <BoxCommonButton
          type="toggle"
          onClick={handleToggleClick}
          width="4px"
          height="20px"
          showGeneralAction={showGeneralAction}
          className="absolute left-2 top-2 z-[9] p-2 group-hover/button:border-purple"
          position="nothing"
        />
      )}
      {showGeneralAction && isOptional && (
        <div ref={boxRef} className="absolute left-1 top-1 z-40">
          <GeneralAction
            type="post"
            postId={postId}
            imageUrl={photoUrl}
            setSharedCount={setSharedCount}
            initialBoundary={currentBoundary}
            onBoundaryChange={setCurrentBoundary}
            onDeleteClick={handleDelete}
            showOnlyShareButton={showOnlyShareButton}
            tempPost={tempPost}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(PostBox);
