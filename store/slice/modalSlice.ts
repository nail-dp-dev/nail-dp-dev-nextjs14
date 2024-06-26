import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    logInCommonModalOpen: (state) => {
      state.isCommonModalShow = true;
      state.whichCommonModal = 'login';
    },
    fileUploadCommonModalOpen: (state) => {
      state.isCommonModalShow = true;
      state.whichCommonModal = 'fileUpload';
    },
    archiveCreateCommonModalOpen: (state) => {
      state.isCommonModalShow = true;
      state.whichCommonModal = 'archiveCreate';
    },
    confirmCommonModalOpen: (state) => {
      state.isCommonModalShow = true;
      state.whichCommonModal = 'confirm';
    },
    commonModalClose: (state) => {
      state.isCommonModalShow = false;
    }
  },
});

export const { commonModalClose, logInCommonModalOpen, fileUploadCommonModalOpen, archiveCreateCommonModalOpen, confirmCommonModalOpen} = commonModalSlice.actions;

export const selectCommonModalStatus = (state: { commonModal: CommonModalState }) => ({
  isCommonModalShow: state.commonModal.isCommonModalShow,
  whichCommonModal: state.commonModal.whichCommonModal,
});

export default commonModalSlice.reducer;
