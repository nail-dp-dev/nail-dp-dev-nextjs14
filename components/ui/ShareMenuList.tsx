// ShareMenuList.tsx
import React from 'react';
import { Icons } from '../../constants/icons';
import { shareMenuElements } from '../../constants';

interface ShareMenuListProps {
  onClick: (message: string) => void;
  selected?: string;
}

export default function ShareMenuList({
  onClick,
  selected,
}: ShareMenuListProps) {
  return (
    <>
      {shareMenuElements.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons];
        return (
          <div
            key={index}
            onClick={() => onClick(item.message)}
            className="hover:shadow-option-slice-shadow 
            group/icon flex cursor-pointer items-center rounded-xl px-3 py-[5px] 
            hover:bg-white hover:font-bold hover:text-purple"
          >
            <IconComponent
              className="mr-1 fill-textDarkPurple 
            group-hover/icon:fill-purple"
            />{' '}
            {item.label}
          </div>
        );
      })}
    </>
  );
}
