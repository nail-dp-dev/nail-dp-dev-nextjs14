'use client';

import React, { useEffect, useState } from 'react';
import { PostMiniModalProps } from '../../../constants/interface';

export default function PostMiniAlarmModal({isText, state}:PostMiniModalProps) {
  const [isState, setIsState] = useState<boolean>();

  useEffect(() => {
    const a = localStorage.getItem('create');
    const b = localStorage.getItem('temp');
    localStorage.removeItem('create');
    console.log(b);
    console.log(a);
  }, []);

  return (
    <div className="relative left-0 top-0 h-screen w-screen">
      <div
        className={`absolute z-50 flex h-[56px] w-[187px] items-center justify-center rounded-full bg-purple text-[20px] font-bold text-white`}
      >
        <p>
          게시글 {isText} {isState ? '성공!' : '실패!'}
        </p>
      </div>
    </div>
  );
}
