import React, { useState, useEffect } from 'react';
import { CommentData } from '../../../../../../types/dataType';
import CommentItem from './CommentItem';

interface UserProps {
  user: CommentData['data'];
}

export default function CommentWrap({ user }: UserProps) {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const [sortedComments, setSortedComments] = useState<CommentData['data']>([]);

  useEffect(() => {
    const sorted = [...user].sort((a, b) => {
      if (sortType === 'latest') {
        return (
          new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime()
        );
      }
      if (sortType === 'popular') {
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
    setSortedComments(sorted);
  }, [sortType, user]);

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

      <div className="w-full overflow-y-hidden rounded-2.5xl bg-purple bg-opacity-20 transition-all duration-300">
        {sortedComments.map((item) => (
          <div key={item.commentId}>
            <CommentItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
