'use client';

import React from 'react';
import { MyPageModalProps } from '../../../../constants/interface';

export default function MyPageModal({ isText }: MyPageModalProps) {

  return (
    <div className="absolute z-30 flex h-[56px] w-[187px] items-center justify-center rounded-full bg-purple text-[20px] font-bold text-white">
      <p>게시글 {isText} 실패!</p>
    </div>
  );
}
