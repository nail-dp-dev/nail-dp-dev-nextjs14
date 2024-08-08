import React, { useState, useRef, useEffect } from 'react';
import { Comment, Reply } from '../../../../../../types/dataType';
import UserImage from '../../../../../../components/ui/UserImage';
import ThumbsUpCount from './ThumbsUpCount';
import ReplyIcon from '../icons/ReplyIcon';
import Toggle from '../../../../../../components/buttons/Toggle';
import CommentOptions from '../CommentOptions';
import DeleteModal from '../DeleteModal';
import PostToggleIcon from '../icons/PostToggleIcon';
import { formatTimeAgo } from '../../../../../../lib/formatTimeAgo';
import ReplyItem from './ReplyItem';

interface CommentItemProps {
  item: Comment;
  onLike: (id: number, increment: number, isReply: boolean) => void;
  onReply: (id: number, name: string) => void;
  onSaveEdit: (
    commentId: number,
    parentId: number | null,
    newContent: string,
  ) => void;
  onDelete: (commentId: number, parentId: number | null) => void;
}

export default function CommentItem({
  item,
  onLike,
  onReply,
  onSaveEdit,
  onDelete,
}: CommentItemProps) {
  const [isRotated, setIsRotated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.commentContent);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    handleResizeHeight();
  }, [isEditing, editedContent]);

  // 텍스트 영역 높이 자동 조정
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  // 대댓글로 스크롤 이동
  const handleReplyClick = () => {
    onReply(item.commentId, item.commentUserNickname);
    setIsRotated(true);
    scrollToComment();
  };
  // 댓글 스크롤 이동
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  // 좋아요 증가/감소
  const handleLike = (id: number, increment: number, isReply: boolean) => {
    onLike(id, increment, isReply);
  };

  // 댓글 수정
  const handleEditClick = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  // 삭제 모달 표시
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setShowOptions(false);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(item.commentContent);
  };

  // 수정 댓글 저장
  const handleSaveEdit = () => {
    if (editedContent.trim() === '') {
      setShowDeleteModal(true);
    } else {
      onSaveEdit(item.commentId, null, editedContent);
      setIsEditing(false);
    }
  };

  // 댓글 수정 취소, 저장
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  // 댓글 삭제 처리
  const handleDeleteConfirm = (commentId: number) => {
    onDelete(commentId, null);
    setShowDeleteModal(false);
  };

  // 신고 버튼 (일단 옵션 닫기로 설정)
  const handleReportClick = () => {
    setShowOptions(false);
  };

  // 사용자 차단 버튼 (일단 옵션 닫기로 설정)
  const handleBlockUserClick = () => {
    setShowOptions(false);
  };

  // 대댓글 토글
  const handleRotatedToggle = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    setIsRotated(!isRotated);
  };

  const replyData = item.replies || [];

  return (
    <div ref={commentRef}>
      <div
        className={`comment-wrap button-tr mx-2 mb-4 mt-[10px] 
          rounded-xl transition-all duration-300
          ${replyData.length > 0 && isRotated ? 'bg-purple bg-opacity-20 px-[10px] pt-[10px] transition-all duration-300' : ''}`}
        >
        <div
          className={`comment-box button-tr group/toggle flex justify-between rounded-xl pb-[10px] pl-[10px] 
          pt-[10px] hover:bg-darkPurple hover:bg-opacity-20`}
        >
          <div className="flex">
            <div className="mr-3">
              <UserImage
                src={item.profileUrl}
                alt="임시이미지"
                width={40}
                height={40}
              />
            </div>
            <div className="leading-4">
              <div className="flex">
                {item.commentUserNickname}
                <p className="commentDate text-14px-normal-dP ml-3">
                  {formatTimeAgo(item.commentDate)}
                  {item.edited && <span className="ml-1">(수정됨)</span>}
                </p>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    ref={textarea}
                    rows={1}
                    onInput={handleResizeHeight}
                    className="comment-edit  hide-scrollbar mt-[5px] w-full min-w-[800px] resize-none
                    overflow-hidden rounded-lg bg-white bg-opacity-70 px-[10px] py-[5px] text-sm 
                    font-normal outline-none"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="text-[0.6875rem]">
                    <span className="mr-2">
                      Esc로
                      <button
                        className="ml-1 text-purple hover:underline active:text-darkPurple"
                        onClick={handleCancelEdit}
                      >
                        취소
                      </button>
                    </span>
                    <span>
                      Enter키로
                      <button
                        className="ml-1 text-purple hover:underline active:text-darkPurple"
                        onClick={handleSaveEdit}
                      >
                        저장
                      </button>
                    </span>
                  </div>
                </div>
              ) : (
                <p className="comment w-full max-w-[800px] text-sm font-normal">
                  {item.commentContent}
                </p>
              )}
              <div className="mt-[8.5px] flex items-center">
                <ThumbsUpCount
                  item={{
                    commentId: item.commentId,
                    likeCount: item.likeCount,
                  }}
                  onLike={handleLike}
                />
                <ReplyIcon
                  className="ml-[10px] mr-[2px] fill-darkPurple hover:fill-purple"
                  onClick={handleReplyClick}
                />
                {replyData.length > 0 && (
                  <div
                    className="button-tr group/item peer flex items-center rounded-2.5xl
                    px-2 py-[2px] hover:bg-darkPurple hover:bg-opacity-20 hover:text-purple"
                    key={`${item.commentId}-replies`}
                    onClick={handleRotatedToggle}
                    onTouchStart={handleRotatedToggle}
                  >
                    <p
                      className="text-14px-normal-dP button-tr select-none 
                    group-hover/item:text-purple"
                    >
                      답글 {replyData.length}개
                    </p>
                    <PostToggleIcon
                      className={`ml-[7px] fill-darkPurple group-hover/item:fill-purple
                      ${isRotated ? 'rotate-180' : ''}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative mr-3 hidden h-full group-hover/toggle:block ">
            <Toggle
              className="fill-white"
              onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
              <CommentOptions
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onReportClick={handleReportClick}
                onBlockUserClick={handleBlockUserClick}
                onClose={() => setShowOptions(false)}
                commentUserNickname={item.commentUserNickname}
              />
            )}
          </div>
        </div>
        {isRotated &&
          replyData.map((replyItem, index) => (
            <div
              key={`${replyItem.replyId}-${index}`}
              className="reply-box ml-9"
            >
              <ReplyItem
                item={replyItem}
                parentId={item.commentId}
                onLike={onLike}
                onReply={onReply}
                onSaveEdit={onSaveEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
      </div>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
          commentId={item.commentId}
        />
      )}
    </div>
  );
}
