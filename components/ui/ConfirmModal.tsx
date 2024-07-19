import React from 'react';

type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  confirmText: string;
  cancelText: string;
};

export default function ConfirmModal({
  onConfirm,
  onCancel,
  message,
  confirmText,
  cancelText,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-modalBackgroundColor">
      <div className="rounded-lg bg-white opacity-85">
        <div className="px-[33px] py-11 text-center">
          <p className="font-bold">{message}</p>
        </div>
        <div className="flex">
          <div className="w-1/2 text-center hover:bg-purple hover:bg-opacity-10">
            <button onClick={onCancel} className="px-[60px] py-[14px] font-bold">
              {cancelText}
            </button>
          </div>
          <div className="w-1/2 text-center hover:bg-red hover:bg-opacity-10">
            <button onClick={onConfirm} className="px-[60px] py-[14px] font-bold text-red">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
