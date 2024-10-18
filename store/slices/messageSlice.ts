import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  isChatModalShow: boolean;
  isChatRoomOpened: boolean;
  activateChatRoomId: string;
}

const initialState: ChatState = {
  isChatModalShow: false,
  isChatRoomOpened: false,
  activateChatRoomId: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatModalShow: (state, action: PayloadAction<boolean>) => {
      state.isChatModalShow = action.payload;
    },
    setChatRoomOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatRoomOpened = action.payload;
    },
    setActivateChatRoomId: (state, action: PayloadAction<string>) => {
      state.activateChatRoomId = action.payload;
    },
    resetChatState: (state) => {
      state.isChatModalShow = false;
      state.isChatRoomOpened = false;
      state.activateChatRoomId = '';
    }
  },
});

export const { setChatModalShow, setChatRoomOpen, setActivateChatRoomId, resetChatState } = chatSlice.actions;

export default chatSlice.reducer;
