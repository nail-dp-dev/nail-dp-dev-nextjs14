'use client';

import Link from 'next/link';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Image from 'next/image';
import Video from '../ui/Video';
import { PostBoxNewProps } from '../../constants/interface';
import { postBoxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../store/slices/boxLayoutSlice';
import Toggle from '../buttons/Toggle';
import GeneralAction from '../buttons/option-menu/GeneralAction';
import { useGeneralAction } from '../../hooks/useGeneralAction';
import { postPostLike } from '../../api/post/postPostLike';
import React, { useEffect, useState } from 'react';
import { deletePostLike } from '../../api/post/deletePostLike';

function PostBox({
  postId,
  photoId,
  photoUrl,
  like,
  saved,
  createdDate,
  tempPost,
}: PostBoxNewProps) {
  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
  const layoutNum = useSelector(selectNumberOfBoxes);
  const [isLiked, setIsLiked] = useState(like);

  const handleHeartClick = async () => {
    if (!isLiked) {
      let data = await postPostLike(postId);
      data.code == 2001 && setIsLiked((prev) => !prev);
    } else {
      let data = await deletePostLike(postId);
      data.code == 2001 && setIsLiked((prev) => !prev);
    }
  };

  const handlePlusClick = () => {
    console.log('Click...Plus!');
  };

  const isPhoto =
    photoUrl.endsWith('.jpg') ||
    photoUrl.endsWith('.jpeg') ||
    photoUrl.endsWith('.png') ||
    photoUrl.endsWith('.gif');
  const isVideo =
    photoUrl.endsWith('.mp4') ||
    photoUrl.endsWith('.mov');

  return (
    <div
      ref={boxRef}
      className="box relative mb-[16px] flex snap-end items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px] transition-all duration-500 hover:border-purple"
      style={{ width: postBoxWidths[layoutNum] }}
    >
      {tempPost == true && (
        <>
          <div className="absolute z-10 h-full w-full bg-darkPurple opacity-60"></div>
          <p className="z-10 text-center text-white">임시저장된 게시물</p>
        </>
      )}
      <Link href={`post/${postId}`} className="absolute inset-0 z-0">
        {isPhoto && (
          <Image
            src={photoUrl}
            alt={createdDate}
            id={photoId.toString()}
            fill
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            quality={100}
            priority
            sizes="100vw, 50vw, 33vw"
            blurDataURL="https://image-component.nextjs.gallery/placeholder"
            placeholder="blur"
          />
        )}
        {isVideo && <Video src={photoUrl} width={'100%'} height={'100%'} />}
      </Link>
      <button
        onClick={handleHeartClick}
        className="absolute right-2 top-2 z-10"
      >
        <HeartButton width="21px" height="19px" isClicked={isLiked} />
      </button>
      <button
        onClick={handlePlusClick}
        className="absolute bottom-2 right-2 z-10"
      >
        <PlusButton width="24px" height="24px" isClicked={saved} />
      </button>
      <button
        onClick={handleToggleClick}
        className="absolute left-2 top-2 z-10 p-2"
      >
        <Toggle
          width="4px"
          height="20px"
          className={`${showGeneralAction ? 'fill-purple' : 'fill-white'}`}
        />
      </button>
      {showGeneralAction && (
        <div className="absolute left-5 top-0 z-20">
          <GeneralAction type="post" />
        </div>
      )}
    </div>
  );
}

export default React.memo(PostBox);
