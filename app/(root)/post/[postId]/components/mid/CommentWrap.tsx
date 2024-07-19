import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommentData } from '../../../../../../types/dataType';
import CommentItem from './CommentItem';
import { repliesDetail } from '../../../../../../api/post/getRepliesDetailData';

interface UserProps {
  user: CommentData['data'];
  onLike: (commentId: number, increment: number) => void;
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
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');
  const [sortedComments, setSortedComments] = useState<CommentData['data']>([]);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const sortComments = useCallback(
    (comments: CommentData['data'], type: 'latest' | 'popular') => {
      return [...comments].sort((a, b) => {
        if (type === 'latest') {
          return (
            new Date(b.commentDate).getTime() -
            new Date(a.commentDate).getTime()
          );
        }
        if (type === 'popular') {
          const likeDiff = b.likeCount - a.likeCount;
          if (likeDiff !== 0) return likeDiff;

          const replyCountA =
            repliesDetail.find((reply) => reply.commentId === a.commentId)?.data
              .length || 0;
          const replyCountB =
            repliesDetail.find((reply) => reply.commentId === b.commentId)?.data
              .length || 0;

          const replyDiff = replyCountB - replyCountA;
          if (replyDiff !== 0) return replyDiff;

          return (
            new Date(b.commentDate).getTime() -
            new Date(a.commentDate).getTime()
          );
        }
        return 0;
      });
    },
    [],
  );

  useEffect(() => {
    setSortedComments(sortComments(user, sortType));
  }, [sortType, user, sortComments]);

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

      <div className="w-full overflow-y-hidden rounded-2.5xl
        bg-purple bg-opacity-20 transition-all duration-300">
        {sortedComments.map((item) => (
          <CommentItem
            key={item.commentId}
            item={item}
            onLike={onLike}
            onReply={onReply}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
          />
        ))}
        <div ref={commentsEndRef} />
      </div>
    </>
  );
};

export default React.memo(CommentWrap);
