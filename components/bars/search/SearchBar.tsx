'use client';

import SearchIcon from '../../../public/assets/svg/search.svg';
import CloseIcon from '../../../public/assets/svg/close.svg';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SearchRecent from './SearchRecent';
import SearchWord from './SearchWord';
import { posts } from '../../../constants/example';
import SearchNickname from './SearchNickname';
import {
  getUserSearchResults,
  getTagSearchResults,
} from '../../../api/search/getSearch';

function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const LOCAL_STORAGE_KEY = 'recentSearchTags';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [searchRecent, setSearchRecent] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTags = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTags ? JSON.parse(storedTags) : [];
    }
    return [];
  });
  const [recommendedWords, setRecommendedWords] = useState(() =>
    posts.sort(() => 0.5 - Math.random()).slice(0, 14),
  );
  const [searchError, setSearchError] = useState('');
  const [isSearchRecentEnabled, setIsSearchRecentEnabled] = useState(true);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [tagResults, setTagResults] = useState<any[]>([]);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm('');
    setSearchError('');
    setUserResults([]);
    setTagResults([]);
    setIsDropdownOpen(false);
  };

  const addToRecentSearches = (term: string) => {
    const normalizedTerm = term.trim();
    const existsInRecent = searchRecent.some(
      (recent) => recent.trim() === normalizedTerm,
    );

    if (isSearchRecentEnabled && !existsInRecent) {
      const updatedRecent = [normalizedTerm, ...searchRecent].slice(0, 30);
      setSearchRecent(updatedRecent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
    }
  };

  // 검색 실행 함수
  const performSearch = async (
    searchQuery: string,
    showError: boolean = false,
  ) => {
    if (!searchQuery) {
      setUserResults([]);
      setTagResults([]);
      setSearchError('');
      return;
    }

    try {
      const searchTerms = searchQuery.split(' ').filter(Boolean);
      const lastSearchTerm = searchTerms[searchTerms.length - 1].toLowerCase(); // 마지막 단어만 검색

      // 이미 있는 태그 요청 X
      const existingTags = tagResults.map((tag) => tag.tagName.toLowerCase());
      if (existingTags.includes(lastSearchTerm)) {
        return;
      }

      const newTagResults = await getTagSearchResults([lastSearchTerm]);

      if (newTagResults && newTagResults.length > 0) {
        setTagResults(newTagResults);
        setSearchError('');
      } else {
        if (showError) {
          setSearchError(`'${lastSearchTerm}' 태그를 찾을 수 없습니다.`);
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setUserResults([]);
      setTagResults([]);
      if (showError) {
        setSearchError('검색 중 오류가 발생했습니다.');
      }
    }
  };

  // 검색 입력 값 변경 핸들러 수정
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchError('');

    if (newSearchTerm !== '@') {
      const searchTerms = newSearchTerm.split(' ').filter(Boolean);
      const lastSearchTerm = searchTerms[searchTerms.length - 1];
      debouncedSearch(lastSearchTerm);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log('검색어 쿼리:', query);
      performSearch(query, true);
    }, 100),
    [tagResults],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (searchTerm.trim() === '' || searchTerm.startsWith('@')) {
        return;
      }

      router.push(`/search/posts?keyword=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm, true);
      setIsDropdownOpen(false);

      addToRecentSearches(searchTerm);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === '' || searchTerm.startsWith('@')) {
      return;
    }

    router.push(`/search/posts?keyword=${encodeURIComponent(searchTerm)}`);
    performSearch(searchTerm, true);
    setIsDropdownOpen(false);

    addToRecentSearches(searchTerm);
  };

  const handleTagClick = (tag: string) => {
    const searchTerms = searchTerm.split(' ').filter(Boolean);

    // 하나의 태그만 있을 때 중복 검사 없이 바로 검색 실행
    if (
      searchTerms.length === 1 &&
      searchTerms[0].toLowerCase() === tag.toLowerCase()
    ) {
      const newSearchTerm = tag;
      setSearchTerm(newSearchTerm);
      performSearch(newSearchTerm, true);
      addToRecentSearches(newSearchTerm);

      // 프로필 검색인 경우
      if (tag.startsWith('@')) {
        const nickname = tag.slice(1);
        router.push(`/profile/${nickname}`);
      } else {
        router.push(
          `/search/posts?keyword=${encodeURIComponent(newSearchTerm)}`,
        );
      }

      setIsDropdownOpen(false);
      return;
    }

    // 여러 개의 태그가 있을 때는 중복된 단어 확인
    const isTagAlreadyExist = searchTerms.some(
      (existingTag) => existingTag.toLowerCase() === tag.toLowerCase(),
    );

    if (isTagAlreadyExist) {
      setSearchError(`'${tag}'는 이미 입력된 태그입니다.`);
    } else {
      if (searchTerms.length > 0) {
        searchTerms[searchTerms.length - 1] = tag;
      } else {
        searchTerms.push(tag);
      }

      const newSearchTerm = searchTerms.join(' ');

      setSearchTerm(newSearchTerm);
      performSearch(newSearchTerm, true);
      addToRecentSearches(newSearchTerm);

      // 프로필 검색인 경우
      if (tag.startsWith('@')) {
        const nickname = tag.slice(1);
        router.push(`/profile/${nickname}`);
      } else {
        router.push(
          `/search/posts?keyword=${encodeURIComponent(newSearchTerm)}`,
        );
      }

      setIsDropdownOpen(false);
    }
  };

  const handleProfileClick = (nickname: string) => {
    const searchFormat = `@${nickname}`;
    router.push(`/profile/${nickname}`);
    setIsDropdownOpen(false);

    addToRecentSearches(searchFormat);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest('.dropdown-container') &&
      !target.closest('.search-input')
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (initialKeyword) {
      setSearchTerm(initialKeyword);
      performSearch(initialKeyword);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [initialKeyword, pathname]);

  const handleClearRecent = () => {
    setSearchRecent([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // 최근 검색어 저장 기능 on/off
  const toggleSearchRecent = () => {
    setIsSearchRecentEnabled((prevState) => !prevState);
  };

  const filteredWords = searchTerm
    ? posts.filter((post) =>
        post.data.tags[0].tagName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : recommendedWords;

  return (
    <div className="relative z-40 w-full">
      <form
        className="relative z-30 flex items-center p-2"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleFormSubmit}
      >
        <div className="search-input relative w-full">
          <input
            className={`w-full rounded-full px-4 py-3 pl-12 placeholder:text-sm placeholder:font-normal placeholder:text-darkPurple 
            focus:outline-none ${
              isDropdownOpen
                ? searchTerm.startsWith('@')
                  ? 'bg-orange bg-opacity-20'
                  : 'bg-purple bg-opacity-20'
                : 'bg-lightGray'
            }`}
            type="text"
            value={searchTerm}
            placeholder="다양한 네일 디자인을 검색해보세요."
            onClick={handleInputClick}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <SearchIcon />
          </div>
          {isDropdownOpen && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-4"
              type="button"
              onClick={handleCloseClick}
            >
              <CloseIcon className="fill-darkPurple" />
            </button>
          )}
        </div>
      </form>
      {isDropdownOpen && (
        <div
          className={`dropdown-container absolute left-0 top-0 w-full border-2 bg-white 
          ${searchTerm.startsWith('@') ? 'border-orange' : 'border-purple'} 
          z-10 min-h-[9rem] rounded-2xl bg-opacity-80 p-[10px] shadow-search-shadow`}
          onClick={(e) => e.stopPropagation()}
        >
          <SearchRecent
            searchRecent={searchRecent}
            searchTerm={searchTerm}
            setSearchRecent={setSearchRecent}
            clearRecent={handleClearRecent}
            toggleSearchRecent={toggleSearchRecent}
            isSearchRecentEnabled={isSearchRecentEnabled}
            onTagClick={handleTagClick}
            tags={searchRecent}
            setTags={setSearchRecent}
            setSearchTerm={setSearchTerm}
            performSearch={performSearch}
            setIsDropdownOpen={setIsDropdownOpen}
          />
          <>
            {!searchTerm.startsWith('@') ? (
              <SearchWord
                searchWords={filteredWords}
                onTagClick={(tag) => {
                  handleTagClick(tag);
                }}
                searchTerm={searchTerm}
                tagResults={tagResults}
              />
            ) : (
              searchTerm.length > 1 && (
                <SearchNickname
                  searchTerm={searchTerm}
                  onTagClick={handleTagClick}
                  followData={userResults}
                  onProfileClick={handleProfileClick}
                />
              )
            )}
          </>
          {searchError && (
            <div className="ml-1 mt-2 text-base font-medium text-darkPurple">
              {searchError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
