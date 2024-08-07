import React, { useEffect, useRef } from 'react';
import useLoggedInUserData from '../../../../../hooks/user/useLoggedInUserData';

interface CommentOptionsProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onReportClick: () => void;
  onBlockUserClick: () => void;
  onClose: () => void;
  commentUserNickname: string;
};

export default function CommentOptions({
  onEditClick,
  onDeleteClick,
  onReportClick,
  onBlockUserClick,
  onClose,
  commentUserNickname,
}: CommentOptionsProps) {
  const { userData } = useLoggedInUserData();
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const isOwnComment = userData?.data.nickname === commentUserNickname;

  return (
    <div
      ref={optionsRef}
      className="Options-box absolute right-0 top-0 mt-2 rounded-xl 
      bg-white p-2 shadow-lg opacity-75 w-auto"
    >
      {isOwnComment ? (
        <>
          <button
            onClick={onEditClick}
            className="text-gray-700 hover:bg-gray-100 text-14px-normal-dP 
            block w-auto text-center p-1 hover:text-purple whitespace-nowrap"
          >
            댓글 수정하기
          </button>
          <button
            onClick={onDeleteClick}
            className="text-gray-700 hover:bg-gray-100 text-14px-normal-dP 
            block w-auto text-center p-1 hover:text-red whitespace-nowrap"
          >
            댓글 삭제하기
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onReportClick}
              className="text-gray-700 hover:bg-gray-100 text-14px-normal-dP 
            block w-auto text-center p-1 hover:text-purple whitespace-nowrap"
          >
            이 댓글 신고하기
          </button>
          <button
            onClick={onBlockUserClick}
              className="text-gray-700 hover:bg-gray-100 text-14px-normal-dP 
            block w-auto text-center p-1 hover:text-red whitespace-nowrap"
          >
            사용자 차단하기
          </button>
        </>
      )}
    </div>
  );
}
