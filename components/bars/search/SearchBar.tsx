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
      let hasResults = false;
      if (searchQuery.startsWith('@') && searchQuery.length > 1) {
        const response = await getUserSearchResults(searchQuery.slice(1));
        if (response && response.data.length > 0) {
          setUserResults(response.data);
          setSearchError('');
          hasResults = true;
        } else {
          setUserResults([]);
          if (showError) {
            setSearchError(
              `'${searchQuery.slice(1)}' 닉네임을 가진 사용자를 찾을 수 없습니다.`,
            );
          }
        }
      } else {
        const response = await getTagSearchResults(searchQuery);
        if (response && response.data.length > 0) {
          setTagResults(response.data);
          setSearchError('');
          hasResults = true;
        } else {
          setTagResults([]);
          if (showError) {
            setSearchError(`'${searchQuery}' 태그를 찾을 수 없습니다.`);
          }
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

  const debouncedSearch = useCallback(
    debounce((query: string) => performSearch(query, true), 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchError('');

    if (newSearchTerm !== '@') {
      debouncedSearch(newSearchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (searchTerm.trim() === '' || searchTerm.startsWith('@')) {
        return;
      }

      router.push(`/search/posts?keyword=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm, true);
      setIsDropdownOpen(false);

      if (isSearchRecentEnabled && !searchRecent.includes(searchTerm)) {
        const updatedRecent = [searchTerm, ...searchRecent].slice(0, 30);
        setSearchRecent(updatedRecent);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
      }
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

    if (isSearchRecentEnabled && !searchRecent.includes(searchTerm)) {
      const updatedRecent = [searchTerm, ...searchRecent].slice(0, 30);
      setSearchRecent(updatedRecent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
    }
  };

  const handleTagClick = (tag: string) => {
    setIsDropdownOpen(false);
    if (tag.startsWith('@')) {
      const nickname = tag.slice(1);
      router.push(`/profile/${nickname}`);
    } else {
      setSearchTerm(tag);
      performSearch(tag, true);

      if (isSearchRecentEnabled && !searchRecent.includes(tag)) {
        const updatedRecent = [tag, ...searchRecent].slice(0, 30);
        setSearchRecent(updatedRecent);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
        console.log('Updated searchRecent:', updatedRecent);
      }

      router.push(`/search/posts?keyword=${encodeURIComponent(tag)}`);
    }

    setIsDropdownOpen(false);
  };

  const handleProfileClick = (nickname: string) => {
    const searchFormat = `@${nickname}`;
    router.push(`/profile/${nickname}`);
    setIsDropdownOpen(false);

    if (isSearchRecentEnabled && !searchRecent.includes(searchFormat)) {
      const updatedRecent = [searchFormat, ...searchRecent].slice(0, 30);
      setSearchRecent(updatedRecent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
    }
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
    <div className="relative z-20 w-full">
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
                  setIsDropdownOpen(false);
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
