import React from 'react';

type DeleteModalProps = {
  onConfirm: (commentId: number) => void;
  onCancel: () => void;
  commentId: number;
};

export default function DeleteModal({
  onConfirm,
  onCancel,
  commentId,
}: DeleteModalProps) {
  const handleConfirm = () => {
    onConfirm(commentId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modalBackgroundColor">
      <div className="rounded-lg bg-white opacity-85 ">
        <div className="px-[33px] py-11 text-center">
          <p className="font-bold">해당 댓글을 삭제하시겠습니까?</p>
        </div>
        <div className=" flex">
          <div className="w-1/2 text-center hover:bg-purple hover:bg-opacity-10">
            <button
              onClick={onCancel}
              className="px-[60px] py-[14px] font-bold"
            >
              취소
            </button>
          </div>
          <div className="w-1/2 text-center hover:bg-red hover:bg-opacity-10">
            <button
              onClick={handleConfirm}
              className="px-[60px] py-[14px] font-bold text-red"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
