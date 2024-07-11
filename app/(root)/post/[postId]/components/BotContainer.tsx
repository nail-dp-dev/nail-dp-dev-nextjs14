import React from 'react';
import { CommentData, PostsDetailData } from '../../../../../types/dataType';
import ChattingBar from './Bot/ChattingBar';

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
      <ChattingBar />
    </>
  );
}
