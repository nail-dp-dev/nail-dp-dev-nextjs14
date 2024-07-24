import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  addComment,
  addReply,
  likeComment,
  setComments,
  saveEdit,
  deleteComment,
  deleteReply,
} from '../store/slice/commentsSlice';
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
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.data);

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
          dispatch(setComments(sortedComments));
        }
      });

      // 대댓글 데이터를 가져와서 상태에 설정
      getRepliesDetailData().then((data) => {
        data.forEach((replyData) => {
          replyData.data.forEach((reply) => {
            dispatch(addReply({ commentId: replyData.commentId, reply }));
          });
        });
      });
    }
  }, [postId, dispatch]);

  // 새로운 댓글 추가
  const handleAddComment = useCallback(
    (newComment: AddCommentType) => {
      dispatch(addComment(newComment));
    },
    [dispatch],
  );

  // 새로운 대댓글 추가
  const handleAddReply = useCallback(
    (commentId: number, reply: AddCommentType) => {
      dispatch(addReply({ commentId, reply }));
    },
    [dispatch],
  );

  // 댓글에 좋아요 추가 or 제거
  const handleLike = useCallback(
    (commentId: number, increment: number) => {
      dispatch(likeComment({ commentId, increment }));
    },
    [dispatch],
  );

  // 댓글 내용 수정
  const handleSaveEdit = useCallback(
    (commentId: number, parentId: number | null, newContent: string) => {
      dispatch(saveEdit({ commentId, parentId, newContent, edited: true })); 
    },
    [dispatch],
  );

  // 댓글 또는 대댓글 삭제
  const handleDelete = useCallback(
    (commentId: number, parentId: number | null) => {
      if (parentId === null) {
        dispatch(deleteComment({ commentId }));
      } else {
        dispatch(deleteReply({ parentId, commentId }));
      }
    },
    [dispatch],
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
