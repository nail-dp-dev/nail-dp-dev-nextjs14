import React from 'react';
import PostChatIcon from './icons/PostChatIcon';
import PostHeartIcon from './icons/PostHeartIcon';
import PostShareIcon from './icons/PostShareIcon';
import { CommentData, PostsDetailData } from '../../../../../types/dataType';
import ChattingBox from './bot/ChattingBox';
import ChattingBar from './bot/ChattingBar';

interface UserDetail {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
}

interface userProps {
  userDetail: UserDetail;
}

export default function BotContainer({ userDetail }: userProps) {
  const { post, comments } = userDetail;

  return (
    <>
      <div className="flex justify-between border-2 py-4">
        <div className="flex gap-[44px] pr-[54px] text-[0.8125rem] font-bold text-darkPurple">
          <div className="flex items-center">
            <PostHeartIcon className="mr-2 fill-darkPurple hover:fill-red" />{' '}
            {post.likeCount}
          </div>
          <div className="flex items-center">
            <PostChatIcon className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple" />{' '}
            {post.commentCount}
          </div>
          <div className="flex items-center">
            <PostShareIcon className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple" />
            {post.sharedCount}
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-[5px] border-2 sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[800px]">
          {post.tags.map((tag, index) => (
            <button
              className="hashtag-layout hashtag-hover-active button-tr button-tr-tf bg-hashTagGray hover:text-white active:text-white"
              key={index}
            >
              {tag.tagName}
            </button>
          ))}
        </div> */}
      </div>
      <ChattingBox user={comments} />
      <ChattingBar />
    </>
  );
}
