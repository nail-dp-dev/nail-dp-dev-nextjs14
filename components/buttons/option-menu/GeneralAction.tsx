import React, { useState, useEffect } from 'react';
import MenuDeleteIcon from '../../../public/assets/svg/menu-delete.svg';
import GeneralSetting from './GeneralSetting';
import GeneralShareMenu from './GeneralShareMenu';
import { archiveActionElements, postActionElements } from '../../../constants';
import { Icons } from '../../../constants/icons';
import { postCloneArchiveCreate } from '../../../api/archive/postCloneArchiveCreate';
import { deleteArchiveCreate } from '../../../api/archive/deleteArchive';
import Link from 'next/link';
import { useHandleShareCount } from '../../../hooks/useHandleShareCount';

interface GeneralActionProps {
  archiveId?: number; 
  type: 'archive' | 'post';
  postId?: number;
  imageUrl?: string;
  setSharedCount?: React.Dispatch<React.SetStateAction<number>>;
  onSettingClick?: () => void;
  onCopyClick?: (e: React.MouseEvent, archiveId: number) => void;
  onEditClick?: (e: React.MouseEvent, archiveId: number) => void;
  onShareClick?: () => void;
  onDeleteClick?: () => void;
  initialBoundary: 'ALL' | 'FOLLOW' | 'NONE'; 
  onBoundaryChange: (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => void; 
}

export default function GeneralAction({
  archiveId,
  type,
  postId,
  imageUrl,
  setSharedCount,
  initialBoundary,
  onDeleteClick = () => console.log('삭제 클릭됨'),
  onCopyClick = (e: React.MouseEvent, archiveId) => {
    e.preventDefault();
    e.stopPropagation();
    postCloneArchiveCreate(archiveId);
  },
  onEditClick = (e: React.MouseEvent, archiveId) => {
    e.preventDefault();
    e.stopPropagation();
    postCloneArchiveCreate(archiveId);
  },
  onBoundaryChange,
}: GeneralActionProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentBoundary, setCurrentBoundary] = useState<'ALL' | 'FOLLOW' | 'NONE'>(initialBoundary);

  const handleShareCount = useHandleShareCount(
    postId as number,
    setSharedCount!,
  );

  useEffect(() => {
    setCurrentBoundary(initialBoundary);
  }, [initialBoundary]);

  const handleSettingClick = () => setShowSetting(true);
  const handleShareClick = () => setShowShareMenu(true);
  const handleBackClick = () => {
    setShowSetting(false);
    setShowShareMenu(false);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    archiveId?: number,
  ) => {
    e.stopPropagation();
    if (archiveId !== undefined) {
      deleteArchiveCreate(archiveId);
    } else {
      console.error('Archive ID is undefined');
    }
  };

  const handleBoundaryChangeInternal = (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => {
    setCurrentBoundary(newBoundary);
    onBoundaryChange(newBoundary);
  };

  if (showSetting) {
    return (
      <GeneralSetting
        type={type}
        postId={postId}
        archiveId={archiveId}
        onBack={handleBackClick}
        initialBoundary={currentBoundary}
        onBoundaryChange={handleBoundaryChangeInternal}
      />
    );
  }

  if (showShareMenu) {
    return (
      <GeneralShareMenu
        onClick={handleShareCount}
        onBack={handleBackClick}
        showBackButton={true}
        type={type}
        imageUrl={imageUrl as string}
      />
    );
  }

  const actionElements = type === 'archive' ? archiveActionElements : postActionElements;

  return (
    <div
      className="text-14px-normal-dP absolute z-10 ml-2 mt-3 w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90  py-[13px]
    shadow-option-modal-shadow"
    >
      {actionElements.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons];
        const handleClick = item.label.includes('설정')
          ? handleSettingClick
          : item.label.includes('공유')
            ? handleShareClick
            : item.label.includes('복제') && archiveId !== undefined
              ? (e: React.MouseEvent) => onCopyClick(e, archiveId)
              : item.label.includes('수정') && archiveId !== undefined
                ? (e: React.MouseEvent) => onEditClick(e, archiveId)
                : item.onClick;

        return (
          <div
            key={index}
            onClick={handleClick}
            className="flex cursor-pointer items-center justify-center rounded-xl px-2 pb-[10px] hover:font-bold"
          >
            {item.label.includes('수정') ? (
              <Link href={`/post/edit/${postId}`} className="flex items-center">
                <IconComponent className="mr-2 fill-textDarkPurple" />
                {item.label}
              </Link>
            ) : (
              <>
                <IconComponent className="mr-2 fill-textDarkPurple" />
                {item.label}
              </>
            )}
          </div>
        );
      })}
      <hr className="mx-auto mt-[5px] w-[85%] border-darkGray" />
      <button
        className="group/item flex items-center justify-center px-2 pt-[5px] hover:font-bold hover:text-red"
        onClick={(e) => handleDeleteClick(e, archiveId)}
      >
        <MenuDeleteIcon className="mr-2 fill-darkPurple group-hover/item:fill-red" />
        {type === 'archive' ? '아카이브 삭제' : '게시물 삭제'}
      </button>
    </div>
  );
}
