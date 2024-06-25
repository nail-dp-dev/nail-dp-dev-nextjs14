'use client';
import React, { useState } from 'react';
import SmallCloseIcon from '../../public/assets/svg/small-close.svg';

export default function SearchButton() {
  const [tags, setTags] = useState(['유광', '무광']);

  const removeTag = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTags(tags.filter((t) => t !== tag));
    console.log('닫기');
  };

  return (
    <div className="m-[5px] flex flex-wrap gap-[5px]">
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-hashTagGray rounded-2xl border-solid border-purple border-[1px] 
          px-4 py-[5.5px] flex items-center space-x-2"
        >
          <span className="font-bold text-sm">{tag}</span>
          <SmallCloseIcon
            onClick={(e) => removeTag(tag, e)}
            className="cursor-pointer"
          />
        </button>
      ))}
    </div>
  );
}
