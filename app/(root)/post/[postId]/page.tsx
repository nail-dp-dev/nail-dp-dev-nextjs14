'use client';

import React, { useState, useCallback } from 'react';
import TopContainer from './components/TopContainer';
import MidContainer from './components/MidContainer';
import usePostDetail from '../../../../hooks/usePostDetail';
import BotContainer from './components/BotContainer';
import useComments from '../../../../hooks/useComments';
import { AddCommentType } from '../../../../hooks/useComments';

export default function PostDetailPage() {
  const userDetail = usePostDetail();
  const {
    comments,
    handleAddComment,
    handleAddReply,
    handleLike,
    handleSaveEdit,
    handleDelete,
  } = useComments(userDetail?.post.postId || null);
  const [replyUser, setReplyUser] = useState<{
    id: number | null;
    name: string | null;
  }>({ id: null, name: null });

  const handleReply = useCallback((id: number, name: string) => {
    setReplyUser({ id, name });
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyUser({ id: null, name: null });
  }, []);

  if (!userDetail) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="hide-scrollbar overflow-auto">
      <TopContainer user={userDetail.post} postId={userDetail.post.postId} />
      <MidContainer
        post={userDetail.post}
        comments={comments}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onLike={handleLike}
        onReply={handleReply}
        onSaveEdit={handleSaveEdit}
        onDelete={handleDelete}
      />
      <BotContainer
        onAddComment={handleAddComment}
        replyUser={replyUser}
        onAddReply={handleAddReply}
        onCancelReply={handleCancelReply}
      />
    </div>
  );
}
