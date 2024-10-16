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
      if (action.payload >= 3 && action.payload <= 4) {
        state.numberOfBoxes = action.payload;
      }
    },
    increaseBoxes: (state) => {
      if (state.numberOfBoxes < 4) {
        state.numberOfBoxes += 1;
      }
    },
    decreaseBoxes: (state) => {
      if (state.numberOfBoxes > 3) {
        state.numberOfBoxes -= 1;
      }
    },
    setBoxesForScreenWidth: (state) => {
      if (window.innerWidth <= 450) {
        state.numberOfBoxes = 3;
      }
    },
  },
});

export const { setNumberOfBoxes, increaseBoxes, decreaseBoxes, setBoxesForScreenWidth } = boxLayoutSlice.actions;

export const selectNumberOfBoxes = (state: { boxLayout: BoxLayoutState }) => state.boxLayout.numberOfBoxes;

export default boxLayoutSlice.reducer;
