'use client';

import { ProfileButtonProps } from "../../constants/interface";

export default function ProfileButton({nickname}:ProfileButtonProps) {

  return (
    <div>
      <button className="w-[84px] h-[32px] mr-[12px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">
        팔로우
      </button>
      <button className="w-[84px] h-[32px] mr-[12px] rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black">
        메세지
      </button>
    </div>
  );
}
