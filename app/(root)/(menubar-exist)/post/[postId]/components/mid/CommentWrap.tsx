import React, { useState, useEffect, useRef } from 'react';
import CommentItem from './CommentItem';
import { Comment } from '../../../../../../../types/dataType';
import LoadingSpinner from '../../../../../../../components/animations/LoadingSpinner';
import BigChatIcon from '../../../../../../../public/assets/svg/big-chat-icon.svg';

interface UserProps {
  user: Comment[];
  onLike: (commentId: number, increment: number, isReply: boolean) => void;
  onReply: (id: number, name: string) => void;
  onSaveEdit: (
    commentId: number,
    parentId: number | null,
    newContent: string,
  ) => void;
  onDelete: (commentId: number, parentId: number | null) => void;
  fetchMoreComments: () => void;
  isLoading: boolean;
  isLastPage: boolean;
}

const CommentWrap = ({
  user,
  onLike,
  onReply,
  onSaveEdit,
  onDelete,
  fetchMoreComments,
  isLoading,
  isLastPage,
}: UserProps) => {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('popular');
  const [sortedComments, setSortedComments] = useState<Comment[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  useEffect(() => {
    const sorted =
      sortType === 'latest'
        ? [...user].sort(
            (a, b) =>
              new Date(b.commentDate).getTime() -
              new Date(a.commentDate).getTime(),
          )
        : [...user].sort((a, b) => b.likeCount - a.likeCount);
    setSortedComments(sorted);
  }, [user, sortType]);

  useEffect(() => {
    if (
      !bottomRef.current ||
      isLoading ||
      isLastPage ||
      sortedComments.length < 20
    )
      return;

    const handleScroll = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading && !isLastPage) {
            setShowLoadingSpinner(true);

            setTimeout(() => {
              fetchMoreComments();
              setShowLoadingSpinner(false);
            }, 1000);
          }
        },
        {
          threshold: 0.7,
        },
      );

      if (bottomRef.current) {
        observerRef.current.observe(bottomRef.current);
      }
    };

    if (window.scrollY === 0) {
      setTimeout(handleScroll, 100);
    } else {
      handleScroll();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [fetchMoreComments, isLoading, isLastPage, sortedComments.length]);

  return (
    <>
      <div className="flex items-center py-2 pl-4">
        <div>
          <p className="mr-5 text-lg font-bold">댓글</p>
        </div>
        <div className="flex gap-3 text-sm font-medium text-darkPurple">
          <button
            onClick={() => setSortType('latest')}
            className={sortType === 'latest' ? 'font-bold ' : 'font-normal'}
          >
            최신순
          </button>
          <button
            onClick={() => setSortType('popular')}
            className={sortType === 'popular' ? 'font-bold ' : 'font-normal'}
          >
            인기순
          </button>
        </div>
      </div>
      <div className="comment-wrap max-h-[500px] w-full 
      overflow-y-scroll rounded-2.5xl bg-purple bg-opacity-20
      transition-all duration-300">
        {sortedComments.length > 0 ? (
          sortedComments.map((item, index) => (
            <CommentItem
              key={`${item.commentId}-${index}`}
              item={item}
              onLike={onLike}
              onReply={onReply}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="my-7 flex flex-col items-center justify-center">
            <BigChatIcon />
            <div className="mt-4 text-center text-base font-medium text-darkPurple">
              <p>아직 작성된 댓글이 없습니다.</p>
              <p>제일 먼저 댓글을 작성해보세요!</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-3"></div>
        {showLoadingSpinner && <LoadingSpinner />}
      </div>
    </>
  );
};

export default React.memo(CommentWrap);
