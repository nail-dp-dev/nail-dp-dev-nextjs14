import React from 'react';
import CloseIcon from '../../../../../../public/assets/svg/close.svg';

type ReplyBarProps = {
  replyTo: string;
  onCancelReply: () => void;
};

export default function ReplyBar({ replyTo, onCancelReply }: ReplyBarProps) {
  return (
    <div
      className="absolute bottom-[70px] left-16 flex  w-fit  items-center  justify-between rounded-3xl
    border-none bg-purple bg-opacity-90 px-[15px] py-[10px]  
    text-sm font-normal text-white"
    >
      <span>{replyTo}</span>
      <button onClick={onCancelReply}>
        <CloseIcon className="ml-1 fill-white" />
      </button>
    </div>
  );
}
