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

// 내아카이브 박스(임시)
export default function ArchiveBox({
  archiveId,
  photoId,
  photoUrl,
  like,
  saved,
  createdDate,
}: ArchiveBoxNewProps) {
  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();
  const layoutNum = useSelector(selectNumberOfBoxes);

  const isPhoto =
    photoUrl.endsWith('.jpg') ||
    photoUrl.endsWith('.jpeg') ||
    photoUrl.endsWith('.png') ||
    photoUrl.endsWith('.gif');
  const isVideo = photoUrl.endsWith('.mp4');

  return (
    <div
      className="box relative mb-[16px] flex snap-end items-center justify-center overflow-hidden rounded-2xl border-[5px] border-transparent p-[5px] transition-all duration-500 hover:border-purple"
      style={{ width: postBoxWidths[layoutNum] }}
    >
      <Link href={`archive/${archiveId}`} className="absolute inset-0 z-0">
        {isPhoto && (
          <Image
            src={photoUrl}
            alt={createdDate}
            id={archiveId.toString()}
            fill
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            quality={100}
            sizes="100vw, 50vw, 33vw"
            blurDataURL="https://image-component.nextjs.gallery/placeholder"
            placeholder="blur"
          />
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
        className="p-2"
      />
      {showGeneralAction && (
        <div ref={boxRef} className="absolute left-5 top-0 z-20">
          <GeneralAction type="archive" />
        </div>
      )}
    </div>
  );
}
