import React from 'react';
import ShareMenuList from '../share/ShareMenuList';

interface MenuProps {
  onClick: (message: string) => void;
  nickname: string;
  imageUrl: string;
}
// 게시물 공유 버튼
export default function PostShareButton({ onClick, imageUrl }: MenuProps) {
  return (
    <div
      className="menu-box text-14px-normal-dP absolute bottom-8 left-0
      z-10 mt-2 whitespace-nowrap rounded-xl bg-white bg-opacity-90
      shadow-option-modal-shadow"
    >
      <ShareMenuList
        onClick={onClick}
        imageUrl={imageUrl}
      />{' '}
    </div>
  );
}
