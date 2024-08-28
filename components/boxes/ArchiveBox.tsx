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
    
  const boxStyle = {
    width: showType === 'album' ? postBoxWidths[layoutNum] : '49.65%',
  };

  return (
    <div
      className={` relative mb-[30px] flex ${showType === 'list' && 'h-[72px] items-center px-[16px] gap-[16px]'}`}
      style={boxStyle}
    >
      <Link
        href={`archive/${archiveId}`} 
        className={`flex w-full h-full ${showType === 'album' && 'flex-col items-center gap-[20px]'} justify-between ${ showType === 'list' && 'items-center px-[16px] rounded-2xl  hover:bg-chatChooseButton cursor-pointer'} z-0`}
      >
        <div
          className={`box ${ photoUrl === null  && 'bg-noArchiveColor'} ${showType === 'list' && 'w-[56px] h-[56px]'} ${showType === 'album' && 'w-full aspect-auto	 transition-all duration-500 hover:border-purple'} relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px]`}
        >
          <div className={`inset-0 z-0 w-full h-full`}>
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
            {isVideo && photoUrl !== null && <Video src={photoUrl} width={'100%'} height={'100%'} />}
          </div>

        </div>
        <div 
          className='px-[10px] w-full h-full flex flex-col items-start justify-center'
        >
          <p className='text-textBlack text-[1rem] font-[700]'>{ archiveName }</p>
          <p className='text-text text-[0.875rem] font-[400]'>{postCount} designs </p>
        </div>
      </Link>
      
        {
          showType === 'album' &&
          <BoxCommonButton
            showType={showType}
            type="toggle"
            onClick={handleToggleClick}
            width="4px"
            height="20px"
            showGeneralAction={showGeneralAction}
            position="top-left"
            className="p-2 z-30 "
          />
        }
        {
          showType === 'album' && showGeneralAction && 
          <div ref={boxRef} className="absolute left-5 top-0 z-40">
            <GeneralAction type="archive" archiveId={archiveId}/>
          </div>
        }
        {
          showType === 'list' &&
          <div
            className='absolute right-0 translate-x-[-20px]'
          >
            <BoxCommonButton
              showType={showType}
              type="toggle"
              onClick={handleToggleClick}
              width="4px"
              height="20px"
              showGeneralAction={showGeneralAction}
              className="p-2 z-30 relative"
            />
            {
              showType === 'list' && showGeneralAction && 
                <div ref={boxRef} className="absolute right-0 bottom-0 z-40 translate-y-[-30px] translate-x-[-150px]">
                  <GeneralAction type="archive" archiveId={archiveId}/>
                </div>
            }
          </div>

        }

    </div>
  );
}
