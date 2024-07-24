import React, { useState } from 'react';
import MenuBack from '../../../public/assets/svg/menu-back.svg';
import MenuCheck from '../../../public/assets/svg/menu-check.svg';
import { settingElements } from '../../../constants';

interface GeneralSettingProps {
  type: 'archive' | 'post';
  onBack: () => void;
}

// 메뉴-설정 게시물/아카이브
export default function GeneralSetting({ type, onBack }: GeneralSettingProps) {
  const [selected, setSelected] = useState('전체공개');

  const items = settingElements.map((item) => ({
    ...item,
    isSelected: item.label === selected,
    onClick: () => {
      setSelected(item.label);
      item.onClick();
    },
  }));

  return (
    <div
      className="text-14px-normal-dP absolute z-10 mt-3 ml-2 w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90 py-2 shadow-option-modal-shadow"
    >
      <div className="flex items-center px-3 text-lg font-bold">
        <button onClick={onBack} className="mr-2">
          <MenuBack />
        </button>
        <span className="text-sm font-bold">
          {type === 'archive' ? '아카이브 설정' : '게시물 설정'}
        </span>
      </div>
      <hr className="mx-auto mt-2 w-[85%] border-darkGray" />
      <div className="px-[19px] py-2 text-sm font-bold">공개범위 설정</div>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={`flex cursor-pointer items-center px-[19px] py-[3px] hover:font-bold ${item.isSelected ? 'font-bold text-purple' : ''}`}
        >
          {item.label}
          {item.isSelected && <MenuCheck className="ml-[6px]" />}
        </div>
      ))}
      {type === 'archive' && (
        <>
          <hr className="mx-auto mt-[5px] w-[85%] border-darkGray" />
          <div className="flex cursor-pointer items-center px-[19px] pt-[5px] hover:font-bold">
            <span className="mr-2">이름 변경</span>
          </div>
        </>
      )}
    </div>
  );
}
