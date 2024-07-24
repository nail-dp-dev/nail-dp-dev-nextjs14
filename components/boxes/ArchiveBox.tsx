'use client';

import Link from 'next/link';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Image from 'next/image';
import { ArchiveBoxNewProps } from '../../constants/interface';
import { postBoxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';
import Video from '../ui/Video';
import Toggle from '../buttons/Toggle';
import { useEffect, useRef, useState } from 'react';
import GeneralAction from '../buttons/option-menu/GeneralAction';

export default function ArchiveBox({
  archiveId,
  photoId,
  photoUrl,
  like,
  saved,
  createdDate,
}: ArchiveBoxNewProps) {
  const [showGeneralAction, setShowGeneralAction] = useState(false);
  const layoutNum = useSelector(selectNumberOfBoxes);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = () => {
    console.log('Click...Heart!');
  };

  const handlePlusClick = () => {
    console.log('Click...Plus!');
  };

  const handleToggleClick = () => {
    setShowGeneralAction(!showGeneralAction);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setShowGeneralAction(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isPhoto =
    photoUrl.endsWith('.jpg') ||
    photoUrl.endsWith('.jpeg') ||
    photoUrl.endsWith('.png') ||
    photoUrl.endsWith('.gif');
  const isVideo = photoUrl.endsWith('.mp4');

  return (
    <div
      ref={boxRef}
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
        <HeartButton width="21px" height="19px" isClicked={like} />
      </button>
      <button
        onClick={handlePlusClick}
        className="absolute bottom-2 right-2 z-10"
      >
        <PlusButton width="24px" height="24px" isClicked={saved} />
      </button>
      <button
        onClick={handleToggleClick}
        className="absolute left-2 top-2 z-10"
      >
        <Toggle
          width="4px"
          height="20px"
          className={`${showGeneralAction ? 'fill-purple' : 'fill-white'}`}
        />
      </button>
      {showGeneralAction && (
        <div className="absolute left-5 top-0 z-20">
          <GeneralAction type="archive" />
        </div>
      )}
    </div>
  );
}
