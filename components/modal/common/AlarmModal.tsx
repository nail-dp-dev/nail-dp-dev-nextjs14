'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectAlarmModalStatus,
} from '../../../store/slices/modalSlice';
import { AlarmModalProps } from '../../../constants/interface';

export default function AlarmModal({ onConfirm }: AlarmModalProps) {
  const dispatch = useDispatch();
  const { alarmImageType, alarmByte, alarmButton, alarmType, alarmUser } =
    useSelector(selectAlarmModalStatus);
  console.log('alarmImageType:', alarmImageType);
  console.log('alarmByte:', alarmByte);

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modalBackgroundColor">
      <div className="rounded-lg bg-white opacity-85">
        <div className="px-[33px] py-11 text-center">
          <p
            className={`${alarmButton !== '삭제' && 'hidden'} text-[18px] font-bold`}
          >
            해당 댓글을 삭제하시겠습니까?
          </p>
          <p
            className={`${alarmButton !== '차단' && 'hidden'} text-[18px] font-bold`}
          >
            {alarmUser} 님의 댓글 및 답글을 차단하시겠습니까?
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
        {alarmType === 'two' ? (
          <div className="flex">
            <div className="w-1/2 text-center hover:bg-purple hover:bg-opacity-10">
              <button
                onClick={closeModal}
                className="px-[60px] py-[14px] font-bold"
              >
                취소
              </button>
            </div>
            <div className="w-1/2 text-center hover:bg-red hover:bg-opacity-10">
              <button
                onClick={onConfirm}
                className="px-[60px] py-[14px] font-bold text-red"
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
