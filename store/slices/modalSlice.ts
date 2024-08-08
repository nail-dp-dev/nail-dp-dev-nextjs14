import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonModalState {
  isCommonModalShow: boolean;
  whichCommonModal: string;
  AlarmModalType: string; //모달 선택지가 1개,2개 확인 one,two로 구분
  AlarmModalButton?: string; // 모달 선택지가 2개면 오른쪽 버튼 글자
  AlarmModalUser?: string; //유저 닉네임
  AlarmModalByte?: number; // 모달 이미지 바이트
  AlarmModalImageType?: string; // 모달 이미지 타입
}

const initialCommonModalState: CommonModalState = {
  isCommonModalShow: false,
  whichCommonModal: '',
  //초기값
  AlarmModalType: '',
  AlarmModalButton: '',
  AlarmModalUser: '',
  AlarmModalByte: 0,
  AlarmModalImageType: '',
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
      //초기화
      state.AlarmModalType = '';
      state.AlarmModalButton = '';
      state.AlarmModalUser = '';
      state.AlarmModalByte = 0;
      state.AlarmModalImageType = '';
    },
    alarmModalData: (
      state,
      action: PayloadAction<{
        type: string;
        button: string;
        user: string;
        byte: number;
        imageType: string;
      }>,
    ) => {
      state.AlarmModalType = action.payload.type;
      state.AlarmModalButton = action.payload.button;
      state.AlarmModalUser = action.payload.user;
      state.AlarmModalByte = action.payload.byte;
      state.AlarmModalImageType = action.payload.imageType;
    },
  },
});

export const { setCommonModal, commonModalClose, alarmModalData } =
  commonModalSlice.actions;

const selectCommonModal = (state: { commonModal: CommonModalState }) =>
  state.commonModal;

export const selectCommonModalStatus = createSelector(
  [selectCommonModal],
  (commonModal) => ({
    isCommonModalShow: commonModal.isCommonModalShow,
    whichCommonModal: commonModal.whichCommonModal,
  }),
);

// const { alarmType,alarmButton, alarmUser, alarmByte, alarmImageType } = useSelector(selectAlarmModalStatus)으로 호출해서 사용
export const selectAlarmModalStatus = createSelector(
  [selectCommonModal],
  (commonModal) => ({
    alarmType: commonModal.AlarmModalType,
    alarmButton: commonModal.AlarmModalButton,
    alarmUser: commonModal.AlarmModalUser,
    alarmByte: commonModal.AlarmModalByte,
    alarmImageType: commonModal.AlarmModalImageType,
  }),
);

export default commonModalSlice.reducer;
