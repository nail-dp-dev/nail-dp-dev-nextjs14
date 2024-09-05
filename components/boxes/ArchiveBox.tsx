'use client';

import React, { useState } from 'react';
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
  archiveId,
  photoId,
  photoUrl,
  archiveName,
  postCount,
  createdDate,
  initialBoundary,
}: ArchiveBoxNewProps) {
  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
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

  if (!isVisible) return null;

  return (
    <div
      className={`relative mb-[30px] flex ${showType === 'list' && 'h-[72px] items-center gap-[16px] px-[16px]'}`}
      style={boxStyle}
    >
      <Link
        href={`archive/${archiveId}`}
        className={`flex h-full w-full ${showType === 'album' && 'flex-col items-center gap-[20px]'} justify-between ${showType === 'list' && 'cursor-pointer items-center rounded-2xl  px-[16px] hover:bg-chatChooseButton'} z-0`}
      >
        <div
          className={`box ${photoUrl === null && 'bg-noArchiveColor'} ${showType === 'list' && 'h-[56px] w-[56px]'} ${showType === 'album' && 'aspect-auto w-full	 transition-all duration-500 hover:border-purple'} relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent`}
        >
          <div className={`inset-0 z-0 h-full w-full `}>
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
                className="flex items-center justify-center"
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
        <div className="flex h-full w-full flex-col items-start justify-center px-[10px]">
          <p className="text-[1rem] font-[700] text-textBlack">{archiveName}</p>
          <p className="text-text text-[0.875rem] font-[400]">
            {postCount} designs{' '}
          </p>
        </div>
      </Link>

      {showType === 'album' && (
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
      {showType === 'album' && showGeneralAction && (
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
      {showType === 'list' && (
        <div className="absolute right-0 translate-x-[-20px]">
          <BoxCommonButton
            showType={showType}
            type="toggle"
            onClick={handleToggleClick}
            width="4px"
            height="20px"
            showGeneralAction={showGeneralAction}
            position="nothing"
            className="relative z-30 p-2 bg-red"
          />
          {showType === 'list' && showGeneralAction && (
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
