'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectAlarmModalStatus,
} from '../../../store/slices/modalSlice';
import { AlarmModalProps } from '../../../constants/interface';

export default function AlarmModal({ onConfirm, onCancel }: AlarmModalProps) {
  const dispatch = useDispatch();
  const {
    alarmImageType,
    alarmByte,
    alarmButton,
    alarmType,
    alarmUser,
    alarmActionType,
  } = useSelector(selectAlarmModalStatus);

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const deleteMessages: { [key: string]: string } = {
    comment: '해당 댓글을 삭제하시겠습니까?',
    archive: `[ ${alarmUser} ]\n아카이브를 삭제하시겠습니까?`,
    post: '이 게시물을 삭제하시겠습니까?',
    block: `${alarmUser} 님의 댓글 및 답글을 차단하시겠습니까?`,
  };

  // alarmActionType이 undefined가 아닌지 확인
  const getDeleteMessage = alarmActionType
    ? deleteMessages[alarmActionType]
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modalBackgroundColor">
      <div className="rounded-lg bg-white opacity-85">
        <div className="px-[33px] py-11 text-center">
          {/* 삭제 관련 메시지 */}
          <p className="whitespace-pre-line text-lg font-bold leading-relaxed text-black">
            {getDeleteMessage}
          </p>
          {/* alarmImageType이 설정된 경우에만 표시 */}
          {alarmImageType && (
            <>
              <p className="text-[18px] font-bold">
                {alarmImageType === 'image' ? '이미지' : '동영상'} 파일의 크기는{' '}
                {alarmImageType === 'image' ? '5' : '10'}MB를 초과할 수
                없습니다.
              </p>
              <p className="pt-[7px] text-[16px] text-red">
                현재 파일 용량 : {Math.ceil(alarmByte! * 10) / 10}MB
              </p>
            </>
          )}
        </div>

        {/* 모달 하단 버튼 (취소/확인) */}
        {alarmType === 'two' ? (
          <div className="flex">
            <div className="w-1/2 text-center hover:bg-purple hover:bg-opacity-10">
              <button
                onClick={onCancel}
                className="px-[60px] py-[14px] text-base font-bold text-black"
              >
                취소
              </button>
            </div>
            <div className="w-1/2 text-center hover:bg-red hover:bg-opacity-10">
              <button
                onClick={onConfirm}
                className="px-[60px] py-[14px] text-base font-bold text-red"
              >
                {alarmButton}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={closeModal}
            className="h-[50px] w-full bg-white hover:bg-purple hover:bg-opacity-10 "
          >
            <p className="font-bold text-black">확인</p>
          </button>
        )}
      </div>
    </div>
  );
}
