import React, { useEffect, useRef, useState } from 'react';
import useLoggedInUserData from '../../../../../../hooks/user/useLoggedInUserData';

interface CommentOptionsProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onReportClick: () => void;
  onBlockUserClick: () => void;
  onClose: () => void;
  commentUserNickname: string;
}

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

  const [isOwnComment, setIsOwnComment] = useState<boolean | null>(null);

  useEffect(() => {
    if (userData) {
      setIsOwnComment(userData?.data.nickname === commentUserNickname);
    }
  }, [userData, commentUserNickname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (isOwnComment === null) {
    return null;
  }

  return (
    <div
      ref={optionsRef}
      className="Options-box absolute right-0 top-0 mr-5 mt-2 w-auto rounded-xl bg-white p-2 opacity-75 shadow-lg"
    >
      {isOwnComment ? (
        <div className="box-one">
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
        </div>
      ) : (
        <div className="box-two">
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
        </div>
      )}
    </div>
  );
}
