'use client';
import React, { useState } from 'react';
import SmallCloseIcon from '../../public/assets/svg/small-close.svg';

export default function SearchButton() {
  const [tags, setTags] = useState(['유광', '무광']);
  const [nameTags, setNameTags] = useState(['@somi', '@mark']);

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
          pl-4 pr-2 py-[5.5px] flex items-center space-x-[2px]
          hover:bg-darkGray  button-tr
          "
        >
          <span className="font-bold text-sm">{tag}</span>
          <div
            className="hover:bg-textDarkPurple hover:bg-opacity-30 button-tr p-1 rounded-full
                flex justify-center items-center active:scale-90 "
            onClick={(e) => removeTag(tag, e)}
          >
            <SmallCloseIcon className="cursor-pointer " />
          </div>
        </button>
      ))}
      {nameTags.map((tag) => (
        <button
          key={tag}
          className="bg-hashTagGray rounded-2xl border-solid border-orange border-[1px] 
          pl-4 pr-2 py-[5.5px] flex items-center space-x-[2px]
          hover:bg-darkGray  button-tr
          "
        >
          <span className="font-bold text-sm">{tag}</span>
          <div
            className="hover:bg-textDarkPurple hover:bg-opacity-30 button-tr p-1 rounded-full
                flex justify-center items-center active:scale-90 "
            onClick={(e) => removeTag(tag, e)}
          >
            <SmallCloseIcon className="cursor-pointer " />
          </div>
        </button>
      ))}
    </div>
  );
}
