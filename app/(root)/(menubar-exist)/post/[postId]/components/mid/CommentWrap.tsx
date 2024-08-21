import React, { useState, useEffect, useRef } from 'react';
import CommentItem from './CommentItem';
import { Comment } from '../../../../../../../types/dataType';
import LoadingSpinner from '../../../../../../../components/animations/LoadingSpinner';

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
    if (user && user.length > 0) {
      const sorted =
        sortType === 'latest'
          ? [...user].sort(
              (a, b) =>
                new Date(b.commentDate).getTime() -
                new Date(a.commentDate).getTime(),
            )
          : [...user].sort((a, b) => b.likeCount - a.likeCount);
      setSortedComments(sorted);
    }
  }, [user, sortType]);

  useEffect(() => {
    if (!bottomRef.current || isLoading || isLastPage) return;

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
          threshold: 1.0,
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
  }, [fetchMoreComments, isLoading, isLastPage]);

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

      <div
        className="w-full overflow-y-hidden rounded-2.5xl 
      bg-purple bg-opacity-20 transition-all duration-300"
      >
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
          <p className="py-4 text-center">댓글이 없습니다.</p>
        )}
        <div ref={bottomRef} className="h-3"></div>
        {showLoadingSpinner && <LoadingSpinner />}
      </div>
    </>
  );
};

export default React.memo(CommentWrap);
