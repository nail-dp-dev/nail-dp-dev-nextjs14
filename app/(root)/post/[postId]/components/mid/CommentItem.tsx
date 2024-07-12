import React, { useState } from 'react';
import PostToggleIcon from '../icons/PostToggleIcon';
import UserImage from '../../../../../../components/ui/UserImage';
import UserInfo from '../../../../../../components/ui/UserInfo';
import ThumbsUpCount from './ThumbsUpCount';
import ReplyIcon from '../icons/ReplyIcon';
import Toggle from '../../../../../../components/buttons/Toggle';
import { CommentData } from '../../../../../../types/dataType';
import ReplyItem from './ReplyItem';
import { repliesDetail } from '../../../../../../api/post/getRepliesDetailData';
import { formatTimeAgo } from '../../../../../../lib/formatTimeAgo';

type CommentItemProps = {
  item: CommentData['data'][number];
};

export default function CommentItem({ item }: CommentItemProps) {
  const [isRotated, setIsRotated] = useState(false);

  const handleRotatedToggle = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    setIsRotated(!isRotated);
  };

  const replyData =
    repliesDetail.find((reply) => reply.commentId === item.commentId)?.data ||
    [];

  return (
    <div>
      <div
        className={`comment-wrap button-tr   mx-2 mb-4 mt-[10px]
          rounded-xl transition-all duration-300
          ${isRotated ? 'bg-purple bg-opacity-20 px-[10px] pt-[10px] transition-all duration-300' : ''}
          `}
      >
        <div
          className="comment-box button-tr group/toggle flex justify-between
          rounded-xl pb-[10px] pl-[10px] pt-[10px] hover:bg-darkPurple hover:bg-opacity-20"
        >
          <div className="flex ">
            <div className="mr-3 ">
              <UserImage
                src={item.profileUrl}
                alt="임시이미지"
                width={40}
                height={40}
              />
            </div>

            <div className="leading-4 ">
              <div className="flex">
                <UserInfo
                  nickname={item.commentUserNickname}
                  nicknameStyle="text-sm font-bold"
                />
                <p className="commentDate text-14px-normal-dP ml-3">
                  {formatTimeAgo(item.commentDate)}
                </p>
              </div>
              <p className="comment text-sm font-normal">
                {item.commentContent}
              </p>
              <div className="mt-[8.5px] flex items-center ">
                <ThumbsUpCount item={item} />
                <ReplyIcon className="ml-[10px] mr-[2px] fill-darkPurple hover:fill-purple " />
                {replyData.length > 0 && (
                  <div
                    className="button-tr group/item peer flex items-center rounded-2.5xl px-2 py-[2px] hover:bg-darkPurple hover:bg-opacity-20 hover:text-purple"
                    key={item.commentId}
                    onClick={handleRotatedToggle}
                    onTouchStart={handleRotatedToggle}
                  >
                    <p className="text-14px-normal-dP button-tr select-none group-hover/item:text-purple">
                      답글 {replyData.length}개
                    </p>
                    <PostToggleIcon
                      className={`ml-[7px] fill-darkPurple group-hover/item:fill-purple ${isRotated ? 'rotate-180' : ''}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`mr-3 hidden h-full group-hover/toggle:block`}>
            <Toggle />
          </div>
        </div>
        {isRotated &&
          replyData.map((replyItem) => (
            <div key={replyItem.commentId}>
              <ReplyItem key={replyItem.commentId} item={replyItem} />
            </div>
          ))}
      </div>
    </div>
  );
}
