import React, { useState } from 'react';
import MenuBack from '../../../public/assets/svg/menu-back.svg';
import MenuCheck from '../../../public/assets/svg/menu-check.svg';
import { settingElements } from '../../../constants';
import { patchPostCloser } from '../../../api/post/patchPostCloser';
import { patchArchiveBoundary } from '../../../api/archive/patchArchiveBoundary';

interface GeneralSettingProps {
  type: 'archive' | 'post';
  postId?: number;
  archiveId?: number;
  onBack: () => void;
  initialBoundary: 'ALL' | 'FOLLOW' | 'NONE';
  onBoundaryChange: (newBoundary: 'ALL' | 'FOLLOW' | 'NONE') => void;
}

// 메뉴-설정 게시물/아카이브
export default function GeneralSetting({
  type,
  onBack,
  postId,
  archiveId,
  initialBoundary,
  onBoundaryChange,
}: GeneralSettingProps) {
  const [selected, setSelected] = useState<'ALL' | 'FOLLOW' | 'NONE'>(
    initialBoundary,
  );

  const handleSettingChange = async (newSetting: 'ALL' | 'FOLLOW' | 'NONE') => {
    setSelected(newSetting);
    onBoundaryChange(newSetting);

    if (type === 'post') {
      const result = await patchPostCloser(postId!, newSetting);
      if (result && result.success) {
        console.log(result.message);
      } else {
        console.error('Failed to update post visibility');
      }
    } else if (type === 'archive') {
      const result = await patchArchiveBoundary(archiveId!, newSetting);
      if (result && result.success) {
        console.log(result.message);
      } else {
        console.error('Failed to update archive visibility');
      }
    }
  };

  const boundaryMap: { [key: string]: 'ALL' | 'FOLLOW' | 'NONE' } = {
    전체공개: 'ALL',
    팔로워공개: 'FOLLOW',
    비공개: 'NONE',
  };

  const items = settingElements.map((item) => ({
    ...item,
    isSelected: boundaryMap[item.label] === selected,
    onClick: () => handleSettingChange(boundaryMap[item.label]),
  }));

  return (
    <div className={`text-14px-normal-dP absolute z-10 mt-3  ${type !== 'archive' ? 'ml-5' : 'ml-2'} w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90 py-2 shadow-option-modal-shadow`}>
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
          className={`flex cursor-pointer items-center px-[19px] py-[3px] hover:font-bold ${
            item.isSelected ? 'font-bold text-purple' : ''
          }`}
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
