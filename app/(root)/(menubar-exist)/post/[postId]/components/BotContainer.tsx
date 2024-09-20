import React from 'react';
import ChattingBar from './bot/ChattingBar';
import { AddCommentType } from '../../../../../../hooks/useComments';

interface BotContainerProps {
  onAddComment: (newComment: AddCommentType) => void;
  onAddReply: (commentId: number, reply: AddCommentType) => void;
  replyUser: { id: number | null; name: string | null };
  onCancelReply: () => void;
};

// 디테일 게시물 페이지의 하단 영역(채팅바)
export default function BotContainer({ onAddComment, onAddReply, replyUser, onCancelReply }: BotContainerProps) {
  return (
    <div className="sticky bottom-0 ">
      <ChattingBar
        onAddComment={onAddComment}
        onAddReply={onAddReply}
        replyUser={replyUser}
        onCancelReply={onCancelReply}
      />
    </div>
  );
}
