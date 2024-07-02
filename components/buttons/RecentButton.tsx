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
          className={`bg-hashTagGray rounded-2xl border-solid ${
            tag.startsWith('@') ? 'border-orange' : 'border-purple'
          } border-[1px] pl-4 pr-2 py-[5.5px] flex items-center space-x-[2px]
          hover:bg-darkGray button-tr`}
        >
          <span className="font-bold text-sm">{tag}</span>
          <div
            className="hover:bg-textDarkPurple hover:bg-opacity-30 button-tr p-1 rounded-full
              flex justify-center items-center active:scale-90"
            onClick={(e) => removeTag(tag, e)}
          >
            <SmallCloseIcon className="cursor-pointer" />
          </div>
        </button>
      ))}
    </div>
  );
}
