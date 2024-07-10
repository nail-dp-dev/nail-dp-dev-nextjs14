import React from 'react';
import PostHeartIcon from '../icons/PostHeartIcon';
import PostChatIcon from '../icons/PostChatIcon';
import PostShareIcon from '../icons/PostShareIcon';
import { PostsDetailData } from '../../../../../../types/dataType';

interface PostCountProps {
  post: PostsDetailData['data'];
  toggleScroll: () => void;
}

export default function PostCount({ post, toggleScroll }: PostCountProps) {
  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[44px] pr-[54px] text-[0.8125rem] font-bold text-darkPurple">
        <div className="flex items-center">
          <PostHeartIcon className="mr-2 fill-darkPurple hover:fill-red" />
          {post.likeCount}
        </div>
        <div className="flex items-center">
          <PostChatIcon
            className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple"
            onClick={toggleScroll}
          />
          {post.commentCount}
        </div>
        <div className="flex items-center">
          <PostShareIcon className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple" />
          {post.sharedCount}
        </div>
      </div>
    </div>
  );
}
