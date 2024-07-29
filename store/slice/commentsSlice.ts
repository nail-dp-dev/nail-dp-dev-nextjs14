import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentData, Comment } from '../../types/dataType';
import { AddCommentType } from '../../hooks/useComments';

type CommentsState = {
  data: Comment[];
};

const initialState: CommentsState = {
  data: [],
};

// 댓글 데이터를 추가, 수정, 삭제, 좋아요 등
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // 댓글 목록 설정
    setComments(state, action: PayloadAction<CommentData['data']>) {
      state.data = action.payload.map((comment) => ({
        ...comment,
        replies: [],
      }));
    },
    // 새로운 댓글 추가
    addComment(state, action: PayloadAction<AddCommentType>) {
      state.data.unshift({
        ...action.payload,
        commentId: state.data.length + 1,
        replies: [],
      });
    },
    // 새로운 대댓글 추가
    addReply(
      state,
      action: PayloadAction<{ commentId: number; reply: AddCommentType }>,
    ) {
      const { commentId, reply } = action.payload;
      const comment = state.data.find(
        (comment) => comment.commentId === commentId,
      );
      if (comment) {
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push({
          ...reply,
          commentId: comment.replies.length + 1,
        });
      }
    },
    // 댓글 좋아요 추가 or 제거
    likeComment(
      state,
      action: PayloadAction<{ commentId: number; increment: number }>,
    ) {
      const { commentId, increment } = action.payload;
      const comment = state.data.find(
        (comment) => comment.commentId === commentId,
      );
      if (comment) {
        comment.likeCount += increment;
      }
    },
    // 댓글 내용을 수정
    saveEdit(
      state,
      action: PayloadAction<{ commentId: number; parentId: number | null; newContent: string; edited: boolean }>,
    ) {
      const { commentId, parentId, newContent, edited } = action.payload;
      if (parentId === null) {
        const comment = state.data.find(
          (comment) => comment.commentId === commentId,
        );
        if (comment) {
          comment.commentContent = newContent;
          comment.edited = edited;
        }
      } else {
        const parentComment = state.data.find(
          (comment) => comment.commentId === parentId,
        );
        if (parentComment && parentComment.replies) {
          const reply = parentComment.replies.find(
            (reply) => reply.commentId === commentId,
          );
          if (reply) {
            reply.commentContent = newContent;
            reply.edited = edited;
          }
        }
      }
    },
    // 댓글 삭제
    deleteComment(state, action: PayloadAction<{ commentId: number }>) {
      state.data = state.data.filter(
        (comment) => comment.commentId !== action.payload.commentId,
      );
    },
    // 대댓글 삭제
    deleteReply(
      state,
      action: PayloadAction<{ parentId: number; commentId: number }>,
    ) {
      const { parentId, commentId } = action.payload;
      const parentComment = state.data.find(
        (comment) => comment.commentId === parentId,
      );
      if (parentComment && parentComment.replies) {
        parentComment.replies = parentComment.replies.filter(
          (reply) => reply.commentId !== commentId,
        );
      }
    },
  },
});

export const {
  setComments,
  addComment,
  addReply,
  likeComment,
  saveEdit,
  deleteComment,
  deleteReply,
} = commentsSlice.actions;

export default commentsSlice.reducer;