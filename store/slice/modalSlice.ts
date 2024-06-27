import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonModalState {
  isCommonModalShow: boolean;
  whichCommonModal: string;
}

const initialCommonModalState: CommonModalState = {
  isCommonModalShow: false,
  whichCommonModal: ''
};

const commonModalSlice = createSlice({
  name: 'commonModal',
  initialState: initialCommonModalState,
  reducers: {
    setCommonModal: (state, action: PayloadAction<string>) => {
      state.isCommonModalShow = true;
      state.whichCommonModal = action.payload;
    },
    commonModalClose: (state) => {
      state.isCommonModalShow = false;
      state.whichCommonModal = '';
    }
  },
});

export const { setCommonModal, commonModalClose } = commonModalSlice.actions;

const selectCommonModal = (state: { commonModal: CommonModalState }) => state.commonModal;

export const selectCommonModalStatus = createSelector(
  [selectCommonModal],
  (commonModal) => ({
    isCommonModalShow: commonModal.isCommonModalShow,
    whichCommonModal: commonModal.whichCommonModal
  })
);

export default commonModalSlice.reducer;
