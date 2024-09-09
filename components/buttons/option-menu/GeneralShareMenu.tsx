import React, { useState } from 'react';
import MenuBack from '../../../public/assets/svg/menu-back.svg';
import ShareMenuList from '../../ui/ShareMenuList';

interface GeneralShareMenuProps {
  onClick: (message: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  type: 'archive' | 'post';
  imageUrl: string;
  id: number;
}

// (옵션메뉴에 있는)공유메뉴 게시물/아카이브
export default function GeneralShareMenu({
  onClick,
  onBack,
  showBackButton = false,
  type,
  imageUrl,
  id,
}: GeneralShareMenuProps) {
  const [selected, setSelected] = useState('');

  const handleClick = (message: string) => {
    setSelected(message);
    onClick(message);
  };

  return (
    <div
      className="text-14px-normal-dP absolute z-10 ml-5 mt-3 w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90 pt-2 shadow-option-modal-shadow"
    >
      {showBackButton && (
        <div
          className="flex items-center 
          px-3 text-lg font-bold"
        >
          <button onClick={onBack} className="mr-2">
            <MenuBack />
          </button>
          <span className="text-sm font-bold">
            {type === 'archive' ? '아카이브 공유' : '게시물 공유'}
          </span>
        </div>
      )}
      <hr className="mx-auto mt-[5px] w-[85%] border-darkGray" />
      <ShareMenuList
        onClick={handleClick}
        selected={selected}
        imageUrl={imageUrl}
        type={type}
        id={id}
      />
    </div>
  );
}