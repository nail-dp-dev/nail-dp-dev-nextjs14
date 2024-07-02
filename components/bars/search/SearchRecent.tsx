import React from 'react';
import RecentButton from '../../buttons/RecentButton';

type SearchRecentProps = {
  searchRecent: string[];
  searchTerm: string;
  setSearchRecent: React.Dispatch<React.SetStateAction<string[]>>;
  clearRecent: () => void;
  toggleSearchRecent: () => void;
  isSearchRecentEnabled: boolean;
  onTagClick: (tag: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

// 최근 검색, 전체 삭제, 검색 기록 저장 끄기
export default function SearchRecent({
  clearRecent,
  toggleSearchRecent,
  isSearchRecentEnabled,
  tags = [],
  onTagClick,
  setTags,
}: SearchRecentProps) {
  return (
    <div className="relative mt-[3.5rem]">
      <div className="topContainer flex justify-between items-center">
        {isSearchRecentEnabled && (
          <div className="flex items-center">
            <p className="text-14px-normal-dP">
              최근 검색 (최대 30개까지 보관)
            </p>
          </div>
        )}
        <div className="flex items-center text-14px-normal-dP ml-auto">
          {isSearchRecentEnabled && (
            <>
              <button onClick={clearRecent}>전체삭제</button>
              <p className="mx-2 select-none">|</p>
            </>
          )}
          <button onClick={toggleSearchRecent}>
            {isSearchRecentEnabled
              ? '검색 기록 저장 끄기'
              : '검색 기록 저장 켜기'}
          </button>
        </div>
      </div>
      <div className="mt-2 min-h-[60px]">
        {isSearchRecentEnabled ? (
          tags.length === 0 ? (
            <p className="text-sm text-darkPurple font-semibold flex justify-center pt-5 ">
              최근 검색어 내역이 없습니다.
            </p>
          ) : (
            <RecentButton
              tags={tags}
              setTags={setTags}
              onTagClick={onTagClick}
            />
          )
        ) : (
          <p className="text-sm text-darkPurple font-semibold text-center flex justify-center pt-5">
            검색어 저장 기능이 꺼져 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
