'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TopContainer from './components/TopContainer';
import MidContainer from './components/MidContainer';
import usePostDetail from '../../../../../hooks/usePostDetail';
import BotContainer from './components/BotContainer';
import useComments from '../../../../../hooks/useComments';
import Loading from '../../../../loading';

// 디테일 게시물 페이지
export default function PostDetailPage() {
  const { userDetail, numericPostId } = usePostDetail();
  const commentsData = useComments(numericPostId, userDetail?.comments || []);

  const [isLoading, setIsLoading] = useState(true);

  const [searchRecent, setSearchRecent] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTags = localStorage.getItem('recentSearchTags');
      return storedTags ? JSON.parse(storedTags) : [];
    }
    return [];
  });

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
    return (
      <>
        <Loading />
      </>
    );
  }

  const nickname = userDetail.post?.nickname ?? '';
  const imageUrl = userDetail.post?.files[0]?.fileUrl ?? '';
  const saved = userDetail.post?.saved ?? false;

  return (
    <div className="hide-scrollbar overflow-y-auto w-full bg-red">
      <TopContainer user={userDetail.post} postId={numericPostId}/>
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
        fetchMoreComments={commentsData.fetchMoreComments}
        isLoading={commentsData.isLoading}
        isLastPage={commentsData.isLastPage}
        nickname={nickname}
        imageUrl={imageUrl}
        searchRecent={searchRecent}
        setSearchRecent={setSearchRecent}
        saved={saved}
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
