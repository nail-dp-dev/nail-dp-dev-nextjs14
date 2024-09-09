import React, { useState, useEffect } from 'react';
import MenuDeleteIcon from '../../../public/assets/svg/menu-delete.svg';
import GeneralSetting from './GeneralSetting';
import GeneralShareMenu from './GeneralShareMenu';
import { archiveActionElements, postActionElements } from '../../../constants';
import { Icons } from '../../../constants/icons';
import { postCloneArchiveCreate } from '../../../api/archive/postCloneArchiveCreate';
import { useDispatch } from 'react-redux';
import {
  setCommonModal,
  alarmModalData,
  commonModalClose,
} from '../../../store/slices/modalSlice';
import Link from 'next/link';
import { useHandleShareCount } from '../../../hooks/useHandleShareCount';
import { deletePost } from '../../../api/post/deletePost';
import { deleteArchiveCreate } from '../../../api/archive/deleteArchive';
import AlarmModal from '../../modal/common/AlarmModal';

interface GeneralActionProps {
  archiveId?: number;
  archiveName?: string;
  type: 'archive' | 'post';
  postId?: number;
  imageUrl?: string;
  setSharedCount?: React.Dispatch<React.SetStateAction<number>>;
  onSettingClick?: () => void;
  onCopyClick?: (e: React.MouseEvent, archiveId: number) => void;
  onEditClick?: (e: React.MouseEvent, archiveId: number) => void;
  onShareClick?: () => void;
  onDeleteClick?: (id: number, type: 'archive' | 'post') => void;
  initialBoundary: 'ALL' | 'FOLLOW' | 'NONE';
  onBoundaryChange: (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => void;
}

// 옵션 메뉴 동작
export default function GeneralAction({
  archiveId,
  archiveName,
  type,
  postId,
  imageUrl,
  setSharedCount,
  initialBoundary,
  onDeleteClick,
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
  const dispatch = useDispatch();
  const [showSetting, setShowSetting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentBoundary, setCurrentBoundary] = useState<
    'ALL' | 'FOLLOW' | 'NONE'
  >(initialBoundary);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShareCount = useHandleShareCount(
    type,
    postId as number,
    setSharedCount,
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
    e: React.MouseEvent<HTMLElement>,
    archiveId?: number,
  ) => {
    e.stopPropagation();
    setShowDeleteModal(true);

    if (archiveId !== undefined) {
      console.log('아카이브 삭제 모달이 열렸습니다.');
      dispatch(
        alarmModalData({
          type: 'two',
          button: '삭제',
          user: archiveName || '아카이브 이름',
          byte: 0,
          imageType: '',
          actionType: 'archive',
        }),
      );
    } else if (postId !== undefined) {
      console.log('포스트 삭제 모달이 열렸습니다.');
      dispatch(
        alarmModalData({
          type: 'two',
          button: '삭제',
          user: '',
          byte: 0,
          imageType: '',
          actionType: 'post',
        }),
      );
    } else {
      console.error('ID is undefined');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (type === 'archive' && archiveId !== undefined) {
        console.log('아카이브 삭제 확인 버튼 클릭됨');
        const response = await deleteArchiveCreate(archiveId);
        if (response) {
          console.log('아카이브가 삭제되었습니다.');
          if (onDeleteClick) onDeleteClick(archiveId, 'archive');
        }
      } else if (type === 'post' && postId !== undefined) {
        console.log('포스트 삭제 확인 버튼 클릭됨');
        const response = await deletePost(postId);
        if (response) {
          console.log('게시물이 삭제되었습니다.');
          if (onDeleteClick) onDeleteClick(postId, 'post');
        }
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }

    setShowDeleteModal(false);
    dispatch(commonModalClose());
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    dispatch(commonModalClose());
  };

  const handleBoundaryChange = (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => {
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
        onBoundaryChange={handleBoundaryChange}
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
        id={type === 'post' ? postId! : archiveId!}
      />
    );
  }

  const actionElements =
    type === 'archive' ? archiveActionElements : postActionElements;

  return (
    <div
      className={`text-14px-normal-dP absolute z-40 bg-white 
    ${type !== 'archive' ? 'ml-5' : 'ml-2'} mt-3 w-[120px] whitespace-nowrap 
    rounded-xl bg-opacity-90 py-[13px] shadow-option-modal-shadow`}
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
                : item.label.includes('삭제')
                  ? (e: React.MouseEvent<HTMLElement>) =>
                      handleDeleteClick(e, archiveId)
                  : item.onClick;

        return (
          <div
            key={index}
            onClick={handleClick}
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
        className="group/item flex w-full items-center justify-center px-2 pt-[5px] hover:font-bold hover:text-red"
        onClick={(e) => handleDeleteClick(e, archiveId)}
      >
        <MenuDeleteIcon className="mr-2 fill-darkPurple group-hover/item:fill-red" />
        {type === 'archive' ? '아카이브 삭제' : '게시물 삭제'}
      </button>
      {showDeleteModal && (
        <AlarmModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
