'use client';

import React from 'react';
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
import NoArchiveImage from '../../public/assets/svg/no-archive.svg'
import NoArchiveFont from '../../public/assets/svg/no-archive-font.svg'

// 내아카이브 박스(임시)
export default function ArchiveBox({
  showType,
  archiveId,
  photoId,
  photoUrl,
  archiveName,
  postCount,
  createdDate,
}: ArchiveBoxNewProps) {

  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
  const layoutNum = useSelector(selectNumberOfBoxes);
  let isPhoto = false;
  let isVideo = false;

  if (photoUrl !== null && postCount !== 0) {
    isPhoto =
      photoUrl.endsWith('.jpg') ||
      photoUrl.endsWith('.jpeg') ||
      photoUrl.endsWith('.png') ||
      photoUrl.endsWith('.gif');
    
    isVideo =
      photoUrl.endsWith('.mp4') ||
      photoUrl.endsWith('.mov');
  }



  return (
    <div
    className='flex flex-col items-center justify-between mb-[30px]relative'
    style={{ width: postBoxWidths[layoutNum] }}
    >
      <div
        className={`box ${ photoUrl === null  && 'bg-noArchiveColor'} w-full relative mb-[12px] flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px] transition-all duration-500 hover:border-purple`}
      >
        <Link href={`archive/${archiveId}`} className="inset-0 z-0">
          {isPhoto && photoUrl !== null && (
            <Image
              src={photoUrl}
              alt={photoId.toString()+createdDate}
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
              className='flex items-center justify-center'
              style={{ width: '100%', height: '100%' }}
              >
              <NoArchiveImage
                className='absolute'
                />
              <NoArchiveFont
                className='absolute translate-y-[10px]'
              />
            </div>
          )}
          {isVideo && <Video src={photoUrl} width={'100%'} height={'100%'} />}
        </Link>
        <BoxCommonButton
          type="toggle"
          onClick={handleToggleClick}
          width="4px"
          height="20px"
          showGeneralAction={showGeneralAction}
          position="top-left"
          className="p-2 z-50"
        />
        {showGeneralAction && (
          <div ref={boxRef} className="absolute left-5 top-0 z-50">
            <GeneralAction type="archive" archiveId={archiveId}/>
          </div>
        )}
      </div>
      <div 
        className='px-[10px] w-full'
      >
        <p className='text-textBlack text-[1rem] font-[700]'>{ archiveName }</p>
        <p className='text-text text-[0.875rem] font-[400]'>{postCount} designs </p>
      </div>
    </div>
  );
}
