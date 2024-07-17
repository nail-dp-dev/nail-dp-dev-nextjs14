'use client';

import { PostCreateModalProps } from '../../../../constants/interface';

export default function PostCreateModal({
  isOverFileType,
  isOverFileMemory,
  setIsModal,
}: PostCreateModalProps) {
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div className="flex h-[168px] w-[300px] flex-col items-center overflow-hidden rounded-[12px] border-[1px] border-purple bg-white opacity-90">
      <div className="px-[44px] pt-[20px] pb-[12px] text-center text-[18px]">
        <p className="font-bold">
          {isOverFileType == 'image' ? '이미지' : '동영상'} 파일의 크기는{' '}
          {isOverFileType == 'image' ? '5' : '10'}MB를 초과할 수 없습니다.
        </p>
        <p className="text-red text-[16px] pt-[7px]">
          현재 파일 용량 : {Math.ceil(isOverFileMemory * 10) / 10}MB
        </p>
      </div>
      <button
        onClick={closeModal}
        className="h-[50px] w-full bg-white hover:bg-purple hover:bg-opacity-10 "
      >
        <p className="text-black font-bold">확인</p>
      </button>
    </div>
  );
}
