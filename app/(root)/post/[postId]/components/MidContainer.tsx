import React from 'react';

import ChattingBox from './bot/ChattingBox';
import PostCount from './mid/PostCount';
import PostTags from './mid/PostTags';
import { CommentData, PostsDetailData } from '../../../../../types/dataType';

interface MidContainerProps {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
}

export default function MidContainer({ post, comments }: MidContainerProps) {
  return (
    <div className="bg-lightYellow ">
      <div className="mx-auto my-0  flex w-full max-w-[1200px] justify-center bg-red pb-[50px]  pt-5">
        <div
          className="aspect-square min-w-[300px] max-w-[535px] 
        flex-shrink flex-grow bg-darkPurple"
        >
          1231
        </div>
      </div>
      <div className="flex  justify-between items-center">
        <PostCount post={post} />
        <PostTags post={post} />
      </div>
      <div>
        <ChattingBox user={comments} />
      </div>
    </div>
  );
}
