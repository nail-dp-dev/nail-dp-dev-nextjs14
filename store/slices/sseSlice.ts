import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SSEState {
  isConnected: boolean;
  error: string | null;
}

const initialState: SSEState = {
  isConnected: false,
  error: null,
};

const sseSlice = createSlice({
  name: 'sse',
  initialState,
  reducers: {
    connectSSE: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    disconnectSSE: (state) => {
      state.isConnected = false;
    },
    setSSEError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnected = false;
    },
  },
});

export const { connectSSE, disconnectSSE, setSSEError } = sseSlice.actions;

export default sseSlice.reducer;
