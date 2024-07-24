// ShareButton.tsx
import React from 'react';
import ShareMenuList from '../ui/ShareMenuList';

interface MenuProps {
  onClick: (message: string) => void;
}

// 게시물 공유 버튼
export default function PostShareButton({ onClick }: MenuProps) {
  return (
    <div className="menu-box text-14px-normal-dP absolute bottom-8 left-0
      z-10 mt-2 whitespace-nowrap rounded-xl bg-white bg-opacity-90
      shadow-option-modal-shadow">
      <ShareMenuList onClick={onClick} />
    </div>
  );
}
