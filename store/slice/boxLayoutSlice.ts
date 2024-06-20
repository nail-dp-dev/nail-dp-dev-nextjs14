import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoxLayoutState {
  numberOfBoxes: number;
}

const storedNumberOfBoxes = localStorage.getItem('numberOfBoxes');
const initialNumberOfBoxes = storedNumberOfBoxes ? parseInt(storedNumberOfBoxes) : 3;

const initialBoxLayoutState: BoxLayoutState = {
  numberOfBoxes: initialNumberOfBoxes,
};

const boxLayoutSlice = createSlice({
  name: 'boxLayout',
  initialState: initialBoxLayoutState,
  reducers: {
    setNumberOfBoxes: (state, action: PayloadAction<number>) => {
      if (action.payload >= 3 && action.payload <= 5) {
        state.numberOfBoxes = action.payload;
        localStorage.setItem('numberOfBoxes', action.payload.toString());
      }
    },
    increaseBoxes: (state) => {
      if (state.numberOfBoxes < 5) {
        state.numberOfBoxes += 1;
        localStorage.setItem('numberOfBoxes', state.numberOfBoxes.toString());
      }
    },
    decreaseBoxes: (state) => {
      if (state.numberOfBoxes > 3) {
        state.numberOfBoxes -= 1;
        localStorage.setItem('numberOfBoxes', state.numberOfBoxes.toString());
      }
    },
  },
});

export const { setNumberOfBoxes, increaseBoxes, decreaseBoxes } = boxLayoutSlice.actions;

export const selectNumberOfBoxes = (state: { boxLayout: BoxLayoutState }) => state.boxLayout.numberOfBoxes;

export default boxLayoutSlice.reducer;
