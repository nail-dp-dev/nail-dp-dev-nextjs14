import { useState, useEffect, useCallback } from 'react';
import { Comment } from '../types/dataType';
import { postCreateComment } from '../api/post/postCreateComment';
import { deleteComment } from '../api/post/deleteComment';
import { patchEditComment } from '../api/post/patchEditComment';

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

  useEffect(() => {
    if (postId !== null && initialComments.length > 0) {
      setComments(initialComments);
    }
  }, [postId, initialComments]);
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
          console.error('Failed to post comment: Invalid response');
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

  // 댓글에 좋아요 추가 or 제거
  const handleLike = useCallback(
    (id: number, increment: number, isReply: boolean) => {
      setComments((prevComments) =>
        prevComments.map((comment) => ({
          ...comment,
          likeCount:
            !isReply && comment.commentId === id
              ? comment.likeCount + increment
              : comment.likeCount,
          replies: (comment.replies || []).map((reply) =>
            isReply && reply.replyId === id
              ? { ...reply, likeCount: reply.likeCount + increment }
              : reply,
          ),
        })),
      );
    },
    [],
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
  };
}
