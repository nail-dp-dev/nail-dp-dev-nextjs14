import React, { useState, useEffect, useRef } from 'react';
import UserImage from '../../../../../../components/ui/UserImage';
import EmoticonIcon from '../../../../../../public/assets/svg/emoticon.svg';
import useUserData from '../../../../../../hooks/useUserData';
import { AddCommentType } from '../../../../../../hooks/useComments';
import ReplyBar from './ReplyBar';

type ChattingBarProps = {
  onAddComment: (newComment: AddCommentType) => void;
  onAddReply: (commentId: number, reply: AddCommentType) => void;
  replyUser: { id: number | null; name: string | null };
  onCancelReply: () => void;
};

export default function ChattingBar({
  onAddComment,
  onAddReply,
  replyUser,
  onCancelReply,
}: ChattingBarProps) {
  const { userData } = useUserData();
  const [commentContent, setCommentContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyUser.name) {
      setCommentContent(`@${replyUser.name} `);
      textareaRef.current?.focus();
    } else {
      setCommentContent('');
    }
  }, [replyUser]);

  const handlePostComment = () => {
    if (commentContent.trim()) {
      const newComment: AddCommentType = {
        commentUserNickname: userData?.data.nickname || '익명',
        profileUrl:
          userData?.data.profileUrl || '/assets/img/logoutProfileImage.png',
        commentDate: new Date().toISOString(),
        commentContent,
        likeCount: 0,
      };

      if (replyUser.id) {
        onAddReply(replyUser.id, newComment);
      } else {
        onAddComment(newComment);
      }

      setCommentContent('');
      onCancelReply();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handlePostComment();
    }
  };

  return (
    <div className="z-9 sticky bottom-0 flex flex-col gap-3  bg-white p-4">
      {replyUser.name && (
        <ReplyBar
          replyTo={`${replyUser.name}님에게 댓글 작성중...`}
          onCancelReply={onCancelReply}
        />
      )}
      <div className="flex items-center gap-3">
        <UserImage
          src={
            userData?.data.profileUrl || '/assets/img/logoutProfileImage.png'
          }
          alt={'profileImage'}
          width={40}
          height={40}
        />
        <form className="relative h-12 w-full ">
          <textarea
            ref={textareaRef}
            placeholder="Add a comment"
            className="h-full w-full resize-none overflow-hidden rounded-2.5xl bg-lightGray py-3 pl-4 text-base font-normal text-darkPurple
              outline-none placeholder:text-darkPurple"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center">
            <EmoticonIcon />
            <button
              type="button"
              className="button-layout button-color ml-[22px] mr-2 px-[26px] py-[5.5px] text-sm font-medium"
              onClick={handlePostComment}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
