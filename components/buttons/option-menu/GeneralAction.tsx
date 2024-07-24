import React, { useState } from 'react';
import MenuDeleteIcon from '../../../public/assets/svg/menu-delete.svg';
import GeneralSetting from './GeneralSetting';
import GeneralShareMenu from './GeneralShareMenu';
import { archiveActionElements, postActionElements } from '../../../constants';
import { Icons } from '../../../constants/icons';

interface GeneralActionProps {
  type: 'archive' | 'post';
  onSettingClick?: () => void;
  onCopyClick?: () => void;
  onEditClick?: () => void;
  onShareClick?: () => void;
  onDeleteClick?: () => void;
}

// 메뉴 게시물/아카이브
export default function GeneralAction({
  type,
  onSettingClick = () => console.log('설정 클릭됨'),
  onCopyClick = () => console.log('복제 클릭됨'),
  onEditClick = () => console.log('수정 클릭됨'),
  onShareClick = () => console.log('공유 클릭됨'),
  onDeleteClick = () => console.log('삭제 클릭됨'),
}: GeneralActionProps) {
  const [showSetting, setShowSetting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSettingClick = () => {
    setShowSetting(true);
  };

  const handleShareClick = () => {
    setShowShareMenu(true);
  };

  const handleBackClick = () => {
    setShowSetting(false);
    setShowShareMenu(false);
  };

  if (showSetting) {
    return <GeneralSetting type={type} onBack={handleBackClick} />;
  }

  if (showShareMenu) {
    return (
      <GeneralShareMenu
        onClick={console.log}
        onBack={handleBackClick}
        showBackButton={true}
        type={type}
      />
    );
  }

  const actionElements =
    type === 'archive' ? archiveActionElements : postActionElements;

  return (
    <div
      className="text-14px-normal-dP absolute z-10 mt-3 ml-2 w-[120px] 
    whitespace-nowrap rounded-xl bg-white bg-opacity-90  py-[13px]
    shadow-option-modal-shadow"
    >
      {actionElements.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons];
        return (
          <div
            key={index}
            onClick={
              item.label.includes('설정')
                ? handleSettingClick
                : item.label.includes('공유')
                  ? handleShareClick
                  : item.label.includes('복제')
                    ? onCopyClick
                    : item.label.includes('수정')
                      ? onEditClick
                      : item.onClick
            }
            className="flex cursor-pointer items-center justify-center 
            rounded-xl px-2 pb-[10px] hover:font-bold"
          >
            <IconComponent className="mr-2 fill-textDarkPurple" />
            {item.label}
          </div>
        );
      })}
      <hr className="mx-auto mt-[5px] w-[85%] border-darkGray" />
      <div
        className="group/item flex items-center justify-center 
        px-2 pt-[5px] hover:font-bold hover:text-red"
        onClick={onDeleteClick}
      >
        <MenuDeleteIcon className="mr-2 fill-darkPurple group-hover/item:fill-red" />
        {type === 'archive' ? '아카이브 삭제' : '게시물 삭제'}
      </div>
    </div>
  );
}
