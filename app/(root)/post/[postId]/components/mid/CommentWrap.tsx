import React, { useState, useEffect, useCallback } from 'react';
import { CommentData } from '../../../../../../types/dataType';
import CommentItem from './CommentItem';

interface UserProps {
  user: CommentData['data'];
}

export default function CommentWrap({ user }: UserProps) {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const [comments, setComments] = useState<CommentData['data']>([]);
  const [sortedComments, setSortedComments] = useState<CommentData['data']>([]);

  const sortComments = useCallback((comments: CommentData['data'], type: 'latest' | 'popular') => {
    return [...comments].sort((a, b) => {
      if (type === 'latest') {
        return (
          new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime()
        );
      }
      if (type === 'popular') {
        if (b.likeCount === a.likeCount) {
          return (
            new Date(b.commentDate).getTime() -
            new Date(a.commentDate).getTime()
          );
        }
        return b.likeCount - a.likeCount;
      }
      return 0;
    });
  }, []);

  useEffect(() => {
    setComments(user);
  }, [user]);

  useEffect(() => {
    setSortedComments(sortComments(comments, sortType));
  }, [sortType, comments, sortComments]);

  const handleLike = (commentId: number, increment: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, likeCount: comment.likeCount + increment }
          : comment
      )
    );
  };

  return (
    <>
      <div className="flex items-center py-2 pl-4">
        <div>
          <p className="mr-5 text-lg font-bold">댓글</p>
        </div>
        <div className="flex gap-1 text-sm font-medium text-darkPurple">
          <button
            onClick={() => setSortType('latest')}
            className={sortType === 'latest' ? 'font-bold ' : 'font-normal'}
          >
            최신순
          </button>
          <p className="text-navMenuBotSolidGray">|</p>
          <button
            onClick={() => setSortType('popular')}
            className={sortType === 'popular' ? 'font-bold ' : 'font-normal'}
          >
            인기순
          </button>
        </div>
      </div>

      <div className="w-full overflow-y-hidden rounded-2.5xl bg-purple bg-opacity-20 
      transition-all duration-300">
        {sortedComments.map((item) => (
          <div key={item.commentId}>
            <CommentItem item={item} onLike={handleLike} />
          </div>
        ))}
      </div>
    </>
  );
}
