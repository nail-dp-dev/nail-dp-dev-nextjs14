import { createSlice } from '@reduxjs/toolkit';

interface LikedPostsButtonState {
  buttonState: boolean;
}

const initialLikedPostsButtonState: LikedPostsButtonState = {
  buttonState: false,
};

const likedPostsSlice = createSlice({
  name: 'likedPosts',
  initialState: initialLikedPostsButtonState,
  reducers: {
    toggleButtonState: (state) => {
      state.buttonState = !state.buttonState;
    },
  },
});

export const { toggleButtonState } = likedPostsSlice.actions;

export const selectButtonState = (state: { likedPosts: LikedPostsButtonState }) => state.likedPosts.buttonState;

export default likedPostsSlice.reducer;
