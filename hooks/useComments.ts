import { useState, useEffect, useCallback } from 'react';
import { CommentData } from '../types/dataType';
import { getCommentData } from '../api/post/getCommentsDetailData';
import { getRepliesDetailData } from '../api/post/getRepliesDetailData';

export type AddCommentType = {
  commentUserNickname: string;
  profileUrl: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
};

export default function useComments(postId: number | null) {
  const [comments, setComments] = useState<CommentData['data']>([]);

  // 댓글 및 대댓글 데이터를 가져와서 상태에 설정
  useEffect(() => {
    if (postId !== null) {
      // 댓글 데이터를 가져와서 상태에 설정
      getCommentData().then((data) => {
        const postComments = data.find((comment) => comment.postId === postId);
        if (postComments) {
          const sortedComments = [...postComments.data].sort(
            (a, b) =>
              new Date(b.commentDate).getTime() -
              new Date(a.commentDate).getTime(),
          );
          setComments(sortedComments);
        }
      });

      // 대댓글 데이터를 가져와서 상태에 설정
      getRepliesDetailData().then((data) => {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            const replyData = data.find((reply) => reply.commentId === comment.commentId);
            return {
              ...comment,
              replies: replyData ? replyData.data : [],
            };
          }),
        );
      });
    }
  }, [postId]);

  // 새로운 댓글 추가
  const handleAddComment = useCallback(
    (newComment: AddCommentType) => {
      setComments((prevComments) => [
        {
          ...newComment,
          commentId: prevComments.length + 1,
          replies: [],
        },
        ...prevComments,
      ]);
    },
    [],
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
                    commentId: (comment.replies?.length || 0) + 1,
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
    (commentId: number, increment: number) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, likeCount: comment.likeCount + increment }
            : comment,
        ),
      );
    },
    [],
  );

  // 댓글 내용 수정
  const handleSaveEdit = useCallback(
    (commentId: number, parentId: number | null, newContent: string) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, commentContent: newContent, edited: true }
            : {
                ...comment,
                replies: (comment.replies || []).map((reply) =>
                  reply.commentId === commentId
                    ? { ...reply, commentContent: newContent, edited: true }
                    : reply,
                ),
              },
        ),
      );
    },
    [],
  );

  // 댓글 또는 대댓글 삭제
  const handleDelete = useCallback(
    (commentId: number, parentId: number | null) => {
      if (parentId === null) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.commentId !== commentId),
        );
      } else {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === parentId
              ? {
                  ...comment,
                  replies: (comment.replies || []).filter(
                    (reply) => reply.commentId !== commentId,
                  ),
                }
              : comment,
          ),
        );
      }
    },
    [],
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
