import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ReplyUserState = {
  id: number | null;
  name: string | null;
};

const initialState: ReplyUserState = {
  id: null,
  name: null,
};

// 답글 작성 시 어느 댓글에 답글을 다는지, 그 댓글 작성자가 누구인지를 추적 슬라이스
const replyUserSlice = createSlice({
  name: 'replyUser',
  initialState,
  reducers: {
    // 답글 작성자 설정
    setReplyUser(state, action: PayloadAction<{ id: number; name: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    // 답글 작성자 정보 초기화
    clearReplyUser(state) {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setReplyUser, clearReplyUser } = replyUserSlice.actions;
export default replyUserSlice.reducer;