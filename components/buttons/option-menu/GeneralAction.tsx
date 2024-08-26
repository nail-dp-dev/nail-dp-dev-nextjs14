import React, { useState } from 'react';
import MenuDeleteIcon from '../../../public/assets/svg/menu-delete.svg';
import GeneralSetting from './GeneralSetting';
import GeneralShareMenu from './GeneralShareMenu';
import { archiveActionElements, postActionElements } from '../../../constants';
import { Icons } from '../../../constants/icons';
import { postCloneArchiveCreate } from '../../../api/archive/postCloneArchiveCreate';
import { deleteArchiveCreate } from '../../../api/archive/deleteArchive';
import Link from 'next/link';

interface GeneralActionProps {
  archiveId?: number;
  type: 'archive' | 'post';
  postId: number;
  nickname: string;
  imageUrl: string;
  onSettingClick?: () => void;
  onCopyClick?: (e:any, archiveId: number) => void;
  onEditClick?: (e:any, archiveId: number) => void;
  onShareClick?: () => void;
  onDeleteClick?: () => void;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
}

// 메뉴 게시물/아카이브
export default function GeneralAction({
  archiveId,
  type,
  postId,
  nickname,
  imageUrl,
  setSharedCount,
  onDeleteClick = () => console.log('삭제 클릭됨'),
  onCopyClick = (e, archiveId) => {
    e.preventDefault()
    e.stopPropagation()
    postCloneArchiveCreate(archiveId)
  },
  onEditClick = (e, archiveId) => {
    e.preventDefault()
    e.stopPropagation()
    postCloneArchiveCreate(archiveId)
  },
}: GeneralActionProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSettingClick = () => {
    setShowSetting(true);
  };

  const handleShareClick = () => {
    setShowShareMenu(true);
  };

  const handleBackClick = () => {
    setShowSetting(false);
    setShowShareMenu(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, archiveId?: number) => {
    e.stopPropagation();
    if (archiveId !== undefined) {
      deleteArchiveCreate(archiveId);
    } else {
      console.error('Archive ID is undefined');
    }
  };

  const handleShareCount = () => {
    setSharedCount((prevCount) => prevCount + 1);
  };

  if (showSetting) {
    return (
      <GeneralSetting type={type} postId={postId} onBack={handleBackClick} />
    );
  }

  if (showShareMenu) {
    return (
      <GeneralShareMenu
        onClick={handleShareCount}
        onBack={handleBackClick}
        showBackButton={true}
        type={type}
        nickname={nickname}
        imageUrl={imageUrl}
      />
    );
  }

  const actionElements =
    type === 'archive' ? archiveActionElements : postActionElements;

  return (
    <div
      className="text-14px-normal-dP absolute z-10 ml-2 mt-3 w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90  py-[13px]
    shadow-option-modal-shadow"
    >
      {actionElements.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons];
        return (
          <div
            key={index}
            onClick={
              item.label.includes('설정')
                ? handleSettingClick
                : item.label.includes('공유')
                  ? handleShareClick
                  : item.label.includes('복제') && archiveId !== undefined
                    ? (e) => onCopyClick(e, archiveId)
                    : item.label.includes('수정') && archiveId !== undefined
                      ? (e) => onEditClick(e, archiveId)
                      : item.onClick
            }
            className="flex cursor-pointer items-center justify-center 
            rounded-xl px-2 pb-[10px] hover:font-bold"
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
