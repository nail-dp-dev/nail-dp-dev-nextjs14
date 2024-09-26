'use client';
import React from 'react';
import SmallCloseIcon from '../../public/assets/svg/small-close.svg';

type RecentButtonProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  onTagClick: (tag: string) => void;
};

// 최근 검색 태그들
export default function RecentButton({
  tags,
  setTags,
  onTagClick,
}: RecentButtonProps) {
  // 태그 삭제
  const removeTag = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-[5px]">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`rounded-2xl border-solid bg-hashTagGray ${
            tag.startsWith('@') ? 'border-orange' : 'border-purple'
          } button-tr flex items-center space-x-[2px] border-[1px] py-[5.5px] pl-4
          pr-2 hover:bg-darkGray`}
        >
          <span className="text-sm text-darkPurple font-bold truncate max-w-[120px]">{tag}</span>
          <div
            className="button-tr flex items-center justify-center rounded-full
              p-1 hover:bg-textDarkPurple hover:bg-opacity-30 active:scale-90"
            onClick={(e) => removeTag(tag, e)}
          >
            <SmallCloseIcon className="cursor-pointer" />
          </div>
        </button>
      ))}
    </div>
  );
}
