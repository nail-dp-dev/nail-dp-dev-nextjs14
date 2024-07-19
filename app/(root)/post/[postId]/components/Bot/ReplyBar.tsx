import React from 'react';

type ReplyBarProps = {
  replyTo: string;
  onCancelReply: () => void;
};

export default function ReplyBar({ replyTo, onCancelReply }: ReplyBarProps) {
  return (
    <div
      className="sticky bottom-0 m-1 flex w-auto max-w-xs
    items-center justify-between  p-2 px-4"
    >
      <span>{replyTo}</span>
      <button onClick={onCancelReply} className="text-red-500">
        x
      </button>
    </div>
  );
}
