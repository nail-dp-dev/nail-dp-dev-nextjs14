'use client';

import { MyPageModalProps } from '../../../../constants/interface';

export default function MyPageModal({
  isText,
}: MyPageModalProps) {

  return (
   <div className="absolute flex h-[56px] w-[187px] font-[20px] font-bold text-white bg-purple items-center justify-center rounded-full z-30">
      <p>게시글 {isText} 실패!</p>
    </div>
  );
}
