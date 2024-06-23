import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoxLayoutState {
  numberOfBoxes: number;
}

const initialBoxLayoutState: BoxLayoutState = {
  numberOfBoxes: 4,
};

const boxLayoutSlice = createSlice({
  name: 'boxLayout',
  initialState: initialBoxLayoutState,
  reducers: {
    setNumberOfBoxes: (state, action: PayloadAction<number>) => {
      if (action.payload >= 3 && action.payload <= 5) {
        state.numberOfBoxes = action.payload;
      }
    },
    increaseBoxes: (state) => {
      if (state.numberOfBoxes < 5) {
        state.numberOfBoxes += 1;
      }
    },
    decreaseBoxes: (state) => {
      if (state.numberOfBoxes > 3) {
        state.numberOfBoxes -= 1;
      }
    },
  },
});

export const { setNumberOfBoxes, increaseBoxes, decreaseBoxes } = boxLayoutSlice.actions;

export const selectNumberOfBoxes = (state: { boxLayout: BoxLayoutState }) => state.boxLayout.numberOfBoxes;

export default boxLayoutSlice.reducer;
