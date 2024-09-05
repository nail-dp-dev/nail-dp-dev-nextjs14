import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  performSearch: (searchQuery: string, showError?: boolean) => void;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 로컬 스토리지 키
const LOCAL_STORAGE_KEY = 'recentSearchTags';
const LOCAL_STORAGE_SEARCH_ENABLED_KEY = 'isSearchRecentEnabled';

// 최근 검색, 전체 삭제, 검색 기록 저장 끄기
export default function SearchRecent({
  clearRecent,
  toggleSearchRecent,
  isSearchRecentEnabled,
  tags = [],
  onTagClick,
  setTags,
  setSearchTerm,
  performSearch,
  setIsDropdownOpen,
}: SearchRecentProps) {
  const router = useRouter();

  // 로컬 스토리지에서 검색어와 설정 불러오기
  useEffect(() => {
    const storedTags = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }

    // 로컬 스토리지에서 검색 기록 저장 설정 불러오기
    const storedIsSearchRecentEnabled = localStorage.getItem(
      LOCAL_STORAGE_SEARCH_ENABLED_KEY,
    );
    if (storedIsSearchRecentEnabled !== null) {
      const isEnabled = JSON.parse(storedIsSearchRecentEnabled);
      if (isEnabled !== isSearchRecentEnabled) {
        toggleSearchRecent();
      }
    }
  }, [setTags]);

  // 검색어 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (isSearchRecentEnabled) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tags));
    }
  }, [tags, isSearchRecentEnabled]);

  // 검색 기록 저장 설정 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SEARCH_ENABLED_KEY,
      JSON.stringify(isSearchRecentEnabled),
    );
  }, [isSearchRecentEnabled]);

  // 검색어 전체 삭제
  const handleClearRecent = () => {
    setTags([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    clearRecent();
  };

  // 태그 클릭 시 로직 업데이트
  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);

    // @로 시작하는 경우 프로필 페이지로 이동
    if (tag.startsWith('@')) {
      const nickname = tag.slice(1);
      router.push(`/profile/${nickname}`);
    } else {
      // 그렇지 않으면 검색 페이지로 이동
      performSearch(tag, true);
      router.push(`/search/posts?keyword=${encodeURIComponent(tag)}`);
    }

    if (!tags.includes(tag) && isSearchRecentEnabled) {
      const updatedTags = [tag, ...tags].slice(0, 30);
      setTags(updatedTags);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTags));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative mt-[3.5rem]">
      <div className="topContainer flex items-center justify-between">
        {isSearchRecentEnabled && (
          <div className="flex items-center">
            <p className="text-14px-normal-dP">
              최근 검색 (최대 30개까지 보관)
            </p>
          </div>
        )}
        <div className="text-14px-normal-dP ml-auto flex items-center">
          {isSearchRecentEnabled && (
            <>
              <button onClick={handleClearRecent}>전체삭제</button>
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
            <p className="flex justify-center pt-5 text-sm font-semibold text-darkPurple ">
              최근 검색어 내역이 없습니다.
            </p>
          ) : (
            <RecentButton
              tags={tags}
              setTags={setTags}
              onTagClick={handleTagClick}
            />
          )
        ) : (
          <p className="flex justify-center pt-5 text-center text-sm font-semibold text-darkPurple">
            검색어 저장 기능이 꺼져 있습니다.
          </p>
        )}
      </div>
    </div>
  );
}
