import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonModalState {
  isCommonModalShow: boolean;
  whichCommonModal: string;
  AlarmModalType: string; //모달 선택지가 1개,2개 확인 one,two로 구분
  AlarmModalButton?: string; // 모달 선택지가 2개면 오른쪽 버튼 글자
  AlarmModalUser?: string; //유저 닉네임
  AlarmModalByte?: number; // 모달 이미지 바이트
  AlarmModalImageType?: string; // 모달 이미지 타입
  ArchiveModalPostId: number; // 아카이브 모달 postId값
  ArchiveSetState?: boolean; // 아카이브에 게시글 저장 성공여부
  PlusState?: boolean; // 플러스 버튼
  StarState?: boolean; // 별 버튼
  ArchiveModalPage?: string;
  alarmActionType?: 'comment' | 'archive' | 'post' | 'block';
}

const initialCommonModalState: CommonModalState = {
  isCommonModalShow: false,
  whichCommonModal: '',
  // 초기값
  AlarmModalType: '',
  AlarmModalButton: '',
  AlarmModalUser: '',
  AlarmModalByte: 0,
  AlarmModalImageType: '',
  ArchiveModalPostId: 0,
  ArchiveSetState: false,
  ArchiveModalPage: '',
  alarmActionType: undefined,
  PlusState: false,
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
      // 초기화
      state.AlarmModalType = '';
      state.AlarmModalButton = '';
      state.AlarmModalUser = '';
      state.AlarmModalByte = 0;
      state.AlarmModalImageType = '';
      state.alarmActionType = undefined;
      state.ArchiveModalPage = '';
    },
    alarmModalData: (
      state,
      action: PayloadAction<{
        type: string;
        button: string;
        user: string;
        byte: number;
        imageType: string;
        actionType: 'comment' | 'archive' | 'post' | 'block';
      }>,
    ) => {
      state.AlarmModalType = action.payload.type;
      state.AlarmModalButton = action.payload.button;
      state.AlarmModalUser = action.payload.user;
      state.AlarmModalByte = action.payload.byte;
      state.AlarmModalImageType = action.payload.imageType;
      state.alarmActionType = action.payload.actionType;
    },
    setArchivePost: (state, action: PayloadAction<{ postId: number }>) => {
      state.ArchiveModalPostId = action.payload.postId;
    },
    setArchiveState: (state, action: PayloadAction<{ state: boolean }>) => {
      state.ArchiveSetState = action.payload.state;
    },
    setPlusState: (state, action: PayloadAction<{ state: boolean }>) => {
      state.PlusState = action.payload.state;
    },
    setStarState: (state, action: PayloadAction<{ state: boolean }>) => {
      state.StarState = action.payload.state;
    },
    setArchivePage: (state, action: PayloadAction<{ state: string }>) => {
      state.ArchiveModalPage = action.payload.state;
    },
  },
});

export const {
  setCommonModal,
  commonModalClose,
  alarmModalData,
  setArchivePost,
  setArchiveState,
  setPlusState,
  setStarState,
  setArchivePage,
} = commonModalSlice.actions;

const selectCommonModal = (state: { commonModal: CommonModalState }) =>
  state.commonModal;

export const selectCommonModalStatus = createSelector(
  [selectCommonModal],
  (commonModal) => ({
    isCommonModalShow: commonModal.isCommonModalShow,
    whichCommonModal: commonModal.whichCommonModal,
  }),
);

export const selectAlarmModalStatus = createSelector(
  [selectCommonModal],
  (commonModal) => ({
    alarmType: commonModal.AlarmModalType,
    alarmButton: commonModal.AlarmModalButton,
    alarmUser: commonModal.AlarmModalUser,
    alarmByte: commonModal.AlarmModalByte,
    alarmImageType: commonModal.AlarmModalImageType,
    alarmActionType: commonModal.alarmActionType,
  }),
);

export const selectArchiveModalStatus = createSelector(
  [selectCommonModal],
  (archiveModal) => ({
    ArchivePostId: archiveModal.ArchiveModalPostId,
    ArchiveState: archiveModal.ArchiveSetState,
    ArchivePage: archiveModal.ArchiveModalPage,
    postState: archiveModal.PlusState,
    starState: archiveModal.StarState,
  }),
);

export default commonModalSlice.reducer;
