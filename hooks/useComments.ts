import { useState, useEffect, useCallback } from 'react';
import { Comment } from '../types/dataType';
import { postCreateComment } from '../api/comment/postCreateComment';
import { deleteComment } from '../api/comment/deleteComment';
import { patchEditComment } from '../api/comment/patchEditComment';
import { deleteCommentUnlike } from '../api/comment/deleteCommentUnlike';
import { postLikeComment } from '../api/comment/postLikeComment';
import { getCommentLike } from '../api/comment/getCommentLike';
import { getCommentData } from '../api/comment/getCommentsDetailData';

export type AddCommentType = {
  commentId?: number;
  commentUserNickname: string;
  profileUrl: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
  replies?: any[];
};

export default function useComments(
  postId: number | null,
  initialComments: Comment[],
) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (postId !== null && initialComments.length > 0) {
      setComments(initialComments);
      setCursorId(
        initialComments[initialComments.length - 1]?.commentId || null,
      );
      setIsLastPage(false);
    }
  }, [postId, initialComments]);

  const fetchMoreComments = useCallback(async () => {
    if (postId === null || isLastPage || isLoading) return;

    setIsLoading(true);
    try {
      const data = await getCommentData(postId, cursorId);
      if (data?.data?.contents?.content.length > 0) {
        setComments((prevComments) => [
          ...prevComments,
          ...data.data.contents.content,
        ]);
        setCursorId(
          data.data.contents.content[data.data.contents.content.length - 1]
            ?.commentId || null,
        );
        setIsLastPage(data.data.contents.last);
      } else {
        setIsLastPage(true);
      }
    } catch (error) {
      console.error('Error fetching more comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, cursorId, isLastPage, isLoading]);

  // 새로운 댓글 추가
  const handleAddComment = useCallback(
    async (newComment: AddCommentType) => {
      if (postId === null) {
        console.error('Post ID is null. Cannot create comment.');
        return;
      }
      try {
        const commentId = await postCreateComment(
          postId,
          newComment.commentContent,
        );

        if (commentId) {
          const createdComment: Comment = {
            commentId,
            commentUserNickname: newComment.commentUserNickname,
            profileUrl: newComment.profileUrl,
            commentDate: new Date().toISOString(),
            commentContent: newComment.commentContent,
            likeCount: 0,
            replies: [],
            replyCount: 0,
          };

          setComments((prevComments) => [createdComment, ...prevComments]);
        } else {
          // console.error('Failed to post comment: Invalid response');
          alert(
            '댓글을 등록할 수 없습니다. 댓글을 등록할 권한이 있는 지 확인하세요',
          );
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    },
    [postId],
  );

  // 새로운 대댓글 추가
  const handleAddReply = useCallback(
    (commentId: number, reply: AddCommentType) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? {
                ...comment,
                replies: [
                  ...(comment.replies || []),
                  {
                    ...reply,
                    replyId: (comment.replies?.length || 0) + 1,
                  },
                ],
              }
            : comment,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (postId !== null) {
        try {
          const updatedComments = await Promise.all(
            comments.map(async (comment) => {
              const { likeCount, liked } = await getCommentLike(
                postId,
                comment.commentId,
              );
              return { ...comment, likeCount, liked };
            }),
          );
          setComments(updatedComments);
        } catch (error) {
          console.error('Failed to fetch like status:', error);
        }
      }
    };
    fetchLikeStatus();
  }, [postId]);

  // 댓글에 좋아요 추가 or 취소
  const handleLike = useCallback(
    async (id: number, increment: number, isReply: boolean) => {
      if (postId === null) {
        console.error('Post ID is null. Cannot like comment.');
        return;
      }

      try {
        if (increment > 0) {
          await postLikeComment(postId, id);
        } else {
          await deleteCommentUnlike(postId, id);
        }

        setComments((prevComments) =>
          prevComments.map((comment) => ({
            ...comment,
            likeCount:
              !isReply && comment.commentId === id
                ? comment.likeCount + increment
                : comment.likeCount,
            liked:
              !isReply && comment.commentId === id
                ? increment > 0
                : comment.liked,
            replies: (comment.replies || []).map((reply) =>
              isReply && reply.replyId === id
                ? { ...reply, likeCount: reply.likeCount + increment }
                : reply,
            ),
          })),
        );
      } catch (error) {
        console.error('Error updating like status:', error);
      }
    },
    [postId],
  );

  // 댓글 내용 수정
  const handleSaveEdit = useCallback(
    async (id: number, parentId: number | null, newContent: string) => {
      if (postId === null) {
        console.error('Post ID is null. Cannot edit comment.');
        return;
      }

      try {
        const updateResult = await patchEditComment(postId, id, newContent);
        if (updateResult?.success) {
          setComments((prevComments) =>
            prevComments.map((comment) => ({
              ...comment,
              commentContent:
                parentId === null && comment.commentId === id
                  ? newContent
                  : comment.commentContent,
              edited:
                parentId === null && comment.commentId === id
                  ? true
                  : comment.edited,
              replies: (comment.replies || []).map((reply) =>
                reply.replyId === id
                  ? { ...reply, commentContent: newContent, edited: true }
                  : reply,
              ),
            })),
          );
        } else {
          console.error('Failed to update comment:', updateResult?.message);
        }
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    },
    [postId],
  );

  // 댓글 또는 대댓글 삭제
  const handleDelete = useCallback(
    async (id: number, parentId: number | null) => {
      if (postId === null) {
        console.error('Post ID is null. Cannot delete comment.');
        return;
      }

      try {
        const deleteResult = await deleteComment(postId, id);
        if (deleteResult?.success) {
          if (parentId === null) {
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.commentId !== id),
            );
          } else {
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.commentId === parentId
                  ? {
                      ...comment,
                      replies: (comment.replies || []).filter(
                        (reply) => reply.replyId !== id,
                      ),
                    }
                  : comment,
              ),
            );
          }
        } else {
          console.error('Failed to delete comment:', deleteResult?.message);
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
    [postId],
  );

  return {
    comments,
    handleAddComment,
    handleAddReply,
    handleLike,
    handleSaveEdit,
    handleDelete,
    fetchMoreComments,
    isLoading,
    isLastPage,
  };
}
