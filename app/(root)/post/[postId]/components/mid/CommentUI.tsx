import React from 'react';
import UserImage from '../../../../../../components/ui/UserImage';
import UserInfo from '../../../../../../components/ui/UserInfo';
import ThumbsUpCount from './ThumbsUpCount';
import Toggle from '../../../../../../components/buttons/Toggle';

type CommentProps = {
  profileUrl: string;
  commentUserNickname: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
  children?: React.ReactNode;
};

export default function CommentUI({
  profileUrl,
  commentUserNickname,
  commentDate,
  commentContent,
  likeCount,
  children,
}: CommentProps) {
  return (
    <div className="comment-box button-tr flex justify-between rounded-xl pb-[10px] pl-[10px] pt-[10px] hover:bg-darkPurple hover:bg-opacity-20">
      <div className="flex ">
        <div className="mr-3 ">
          <UserImage src={profileUrl} alt="임시이미지" width={40} height={40} />
        </div>
        <div className="leading-4 ">
          <div className="flex">
            <UserInfo nickname={commentUserNickname} nicknameStyle="text-sm font-bold" />
            <p className="commentDate text-14px-normal-dP ml-3">{commentDate}</p>
          </div>
          <p className="comment text-sm font-normal">{commentContent}</p>
          <div className="mt-[8.5px] flex items-center ">
            <ThumbsUpCount item={{likeCount}} />
            {children}
          </div>
        </div>
      </div>
      <div className="mr-3 hidden h-full group-hover:block">
        <Toggle />
      </div>
    </div>
  );
}
