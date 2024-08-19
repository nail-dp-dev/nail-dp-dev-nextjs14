import React, { useState, useEffect, useRef } from 'react';
import CommentItem from './CommentItem';
import { Comment, CommentData } from '../../../../../../../types/dataType';

interface UserProps {
  // user: CommentData['data'];
  user: Comment[];
  onLike: (commentId: number, increment: number, isReply: boolean) => void;
  onReply: (id: number, name: string) => void;
  onSaveEdit: (
    commentId: number,
    parentId: number | null,
    newContent: string,
  ) => void;
  onDelete: (commentId: number, parentId: number | null) => void;
}

const CommentWrap = ({
  user,
  onLike,
  onReply,
  onSaveEdit,
  onDelete,
}: UserProps) => {
  useEffect(() => {
    console.log('Comments in CommentWrap:', user);
  }, [user]);

  const [sortType, setSortType] = useState<'latest' | 'popular'>('popular');
  const [sortedComments, setSortedComments] = useState<Comment[]>([]);
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
          sortedComments.map((item) => (
            <CommentItem
              key={item.commentId}
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
      </div>
    </>
  );
};

export default React.memo(CommentWrap);
