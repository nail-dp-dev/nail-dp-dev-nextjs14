'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TopContainer from './components/TopContainer';
import MidContainer from './components/MidContainer';
import usePostDetail from '../../../../../hooks/usePostDetail';
import BotContainer from './components/BotContainer';
import useComments from '../../../../../hooks/useComments';

export default function PostDetailPage() {
  const { userDetail, numericPostId } = usePostDetail();
  const commentsData = useComments(numericPostId, userDetail?.comments || []);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('PostDetailPage - userDetail:', userDetail);
    console.log('PostDetailPage - numericPostId:', numericPostId);
    if (userDetail && numericPostId !== null) {
      setIsLoading(false);
    }
  }, [userDetail, numericPostId]);

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

  if (!userDetail || numericPostId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hide-scrollbar overflow-auto">
      <TopContainer user={userDetail.post} postId={numericPostId} />
      <MidContainer
        post={userDetail.post}
        postId={numericPostId}
        comments={commentsData.comments}
        onAddComment={commentsData.handleAddComment}
        onAddReply={commentsData.handleAddReply}
        onLike={commentsData.handleLike}
        onReply={handleReply}
        onSaveEdit={commentsData.handleSaveEdit}
        onDelete={commentsData.handleDelete}
      />
      <BotContainer
        onAddComment={commentsData.handleAddComment}
        replyUser={replyUser}
        onAddReply={commentsData.handleAddReply}
        onCancelReply={handleCancelReply}
      />
    </div>
  );
}
