'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchiveBoxNewProps } from '../../constants/interface';
import { postBoxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../store/slices/boxLayoutSlice';
import Video from '../ui/Video';
import GeneralAction from '../buttons/option-menu/GeneralAction';
import BoxCommonButton from '../ui/BoxCommonButton';
import { useGeneralAction } from '../../hooks/useGeneralAction';
import NoArchiveImage from '../../public/assets/svg/no-archive.svg';
import NoArchivePng from '../../public/assets/img/noArchiveImage.png'; 
import NoArchiveFont from '../../public/assets/svg/no-archive-font.svg';
import { useVisibility } from '../../hooks/useVisibility';

export default function ArchiveBox({
  showType,
  category,
  category,
  archiveId,
  photoId,
  photoUrl,
  profileUrl,
  nickname,
  archiveCount,
  archiveName,
  postCount,
  createdDate,
  initialBoundary,
}: ArchiveBoxNewProps) {
  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
  const [link, setLink] = useState('')
  const [link, setLink] = useState('')
  const layoutNum = useSelector(selectNumberOfBoxes);
  const { isVisible, handleDelete } = useVisibility();
  const [currentBoundary, setCurrentBoundary] = useState<
    'ALL' | 'FOLLOW' | 'NONE'
  >(initialBoundary);

  let isPhoto = false;
  let isVideo = false;

  if (photoUrl !== null && postCount !== 0) {
    isPhoto =
      photoUrl.endsWith('.jpg') ||
      photoUrl.endsWith('.jpeg') ||
      photoUrl.endsWith('.png') ||
      photoUrl.endsWith('.gif');

    isVideo = photoUrl.endsWith('.mp4') || photoUrl.endsWith('.mov');
  }

  const boxStyle = {
    width: showType === 'album' ? postBoxWidths[layoutNum] : '49.65%',
  };

  const handleBoundaryChange = (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => {
    setCurrentBoundary(newBoundary);
  };

  // if (!isVisible) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(archiveId){
      setLink(`archive/${archiveId}`)
    }
    if(nickname){
      setLink(`profile/${nickname}`)
    }
  },[])
  // if (!isVisible) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(archiveId){
      setLink(`archive/${archiveId}`)
    }
    if(nickname){
      setLink(`profile/${nickname}`)
    }
  },[])

  return (
    <div
      className={`relative ${showType === 'album' && 'mb-[10px]'} flex ${showType === 'list'  && 'h-[72px] items-center gap-[16px] px-[16px] hover:border-purple'}`}
      className={`relative ${showType === 'album' && 'mb-[10px]'} flex ${showType === 'list'  && 'h-[72px] items-center gap-[16px] px-[16px] hover:border-purple'}`}
      style={boxStyle}
    >
      <Link
        href={link}
        href={link}
        className={`flex h-full w-full ${showType === 'album' && 'flex-col items-center gap-[20px]'} justify-between ${showType === 'list' && 'cursor-pointer items-center rounded-2xl  px-[16px] hover:bg-chatChooseButton'} z-0`}
      >
        <div
          className={`box relative ${photoUrl === null && 'bg-noArchiveColor'} ${showType === 'list' && 'h-[56px] w-[56px]'} ${showType === 'album' &&  category === 'archive' && 'aspect-auto w-full hover:border-purple'} ${showType === 'album' &&  category === 'following' && 'aspect-auto w-full'} relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent z-0`}
          className={`box relative ${photoUrl === null && 'bg-noArchiveColor'} ${showType === 'list' && 'h-[56px] w-[56px]'} ${showType === 'album' &&  category === 'archive' && 'aspect-auto w-full hover:border-purple'} ${showType === 'album' &&  category === 'following' && 'aspect-auto w-full'} relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent z-0`}
        >
          <div className={`inset-0 z-0 h-full w-full relative`}>
            {isPhoto && photoUrl !== null && (
              <Image
                src={photoUrl}
                alt={photoId.toString() + createdDate}
                id={archiveId.toString()}
                fill
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                quality={100}
                sizes="100vw, 50vw, 33vw"
                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                placeholder="blur"
              />
            )}
            {photoUrl === null && postCount === 0 && (
              <div
                className="flex items-center justify-center bg-red"
                style={{ width: '100%', height: '100%' }}
              >
                <NoArchiveImage className="absolute" />
                <NoArchiveFont className="absolute translate-y-[10px]" />
              </div>
            )}
            {isVideo && photoUrl !== null && (
              <Video src={photoUrl} width={'100%'} height={'100%'} />
            )}
          </div>
        </div>
        {
          category === 'following' && showType === 'list' && profileUrl &&
          <div className='flex-1 flex flex-col items-start justify-center h-full px-[16px] py-[8px]'>
            <div className='flex items-center gap-[10px]'>
              <div className='w-[20px] h-[20px] rounded-full overflow-hidden'>
                <Image   
                  width={50}
                  height={50}
                  src={profileUrl}
                  alt={'profileImage'}
                  id={profileUrl.toString()}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  quality={100}
                  sizes="100vw, 50vw, 33vw "
                  blurDataURL="https://image-component.nextjs.gallery/placeholder"
                  placeholder="blur"/>
              </div>
              <span className='font-[700] text-[0.875rem]'>{nickname} 님의 아카이브</span>
            </div>
            <span className='font-[400] text-[0.875rem] text-textDarkPurple'>{archiveCount}개의 아카이브</span>
          </div>
        }
        {
          category === 'archive' &&
          <div className="flex h-full w-full flex-col items-start justify-center px-[10px]">
            <p className="text-[1rem] font-[700] text-textBlack">{archiveName}</p>
            <p className="text-text text-[0.875rem] font-[400]">
              {postCount} designs{' '}
            </p>
          </div>
        }
        {
          showType === 'album' && category === 'following' && profileUrl &&
          <div
            className="h-[50px] w-full flex items-start justify-between gap-[12px] px-[10px]"
          >
            <div className='w-[50px] h-[50px] rounded-full overflow-hidden '>
              <Image   
                width={50}
                height={50}
                src={profileUrl}
                alt={'profileImage'}
                id={profileUrl.toString()}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                quality={100}
                sizes="100vw, 50vw, 33vw "
                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                placeholder="blur"/>
              </div>
              <div className='flex-1 h-[50px] flex flex-col items-end'>
                <p className='font-[500]'>{nickname}</p>
                <p className='font-[400] text-[0.875rem] font-archiveCountInfo font-Epilogue'>{archiveCount}<span>archive</span></p>
              </div>
          </div>
        }
      </Link>

      {showType === 'album' && category === 'archive' && (
        <BoxCommonButton
          showType={showType}
          type="toggle"
          onClick={handleToggleClick}
          width="4px"
          height="20px"
          showGeneralAction={showGeneralAction}
          position="top-left"
          className="z-30 p-2 "
        />
      )}
      {showType === 'album' && category === 'archive' && showGeneralAction && (
        <div ref={boxRef} className="absolute left-5 top-0 z-40">
          <GeneralAction
            type="archive"
            archiveId={archiveId}
            initialBoundary={currentBoundary}
            onBoundaryChange={handleBoundaryChange}
            archiveName={archiveName}
            imageUrl={photoUrl || ''}
            onDeleteClick={handleDelete}
          />
        </div>
      )}
      {showType === 'list' && category === 'archive' && (
        <div className="absolute right-0 translate-x-[-20px] z-40">
      {showType === 'list' && category === 'archive' && (
        <div className="absolute right-0 translate-x-[-20px] z-40">
          <BoxCommonButton
            showType={showType}
            type="toggle"
            onClick={handleToggleClick}
            width="4px"
            height="20px"
            showGeneralAction={showGeneralAction}
            position="nothing"
            className="relative z-40 p-2"
            className="relative z-40 p-2"
          />
          {showType === 'list' && category === 'archive' && showGeneralAction && (
          {showType === 'list' && category === 'archive' && showGeneralAction && (
            <div
              ref={boxRef}
              className="absolute bottom-0 right-0 z-40 translate-x-[-150px] translate-y-[-30px]"
            >
              <GeneralAction
                type="archive"
                archiveId={archiveId}
                initialBoundary={currentBoundary}
                onBoundaryChange={handleBoundaryChange}
                archiveName={archiveName}
                imageUrl={photoUrl || ''}
                onDeleteClick={handleDelete}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
