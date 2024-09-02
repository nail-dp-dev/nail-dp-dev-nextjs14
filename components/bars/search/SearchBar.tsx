'use client';

import SearchIcon from '../../../public/assets/svg/search.svg';
import CloseIcon from '../../../public/assets/svg/close.svg';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchRecent from './SearchRecent';
import SearchWord from './SearchWord';
import { posts } from '../../../constants/example';
import SearchNickname from './SearchNickname';
import { getUserSearchResults, getTagSearchResults } from '../../../api/search/getSearch';

function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchBar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRecent, setSearchRecent] = useState<string[]>([]);
  const [recommendedWords, setRecommendedWords] = useState(() =>
    posts.sort(() => 0.5 - Math.random()).slice(0, 14)
  );
  const [searchError, setSearchError] = useState('');
  const [isSearchRecentEnabled, setIsSearchRecentEnabled] = useState(true);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [tagResults, setTagResults] = useState<any[]>([]);
  const [cachedResults, setCachedResults] = useState<Map<string, any[]>>(new Map());

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

  // 검색을 수행하는 함수
  const performSearch = async (searchQuery: string, showError: boolean = false) => {
    if (!searchQuery) {
      setUserResults([]);
      setTagResults([]);
      setSearchError('');
      return;
    }

    if (cachedResults.has(searchQuery)) {
      setUserResults(cachedResults.get(searchQuery) || []);
      setSearchError('');
      return;
    }

    // 닉네임 검색 처리
    if (searchQuery.startsWith('@') && searchQuery.length > 1) {
      try {
        const response = await getUserSearchResults(searchQuery.slice(1));
        if (response && response.data.length > 0) {
          const filteredResults = response.data.filter((user: any) => {
            const nickname = user.nickname.toLowerCase();
            const searchValue = searchQuery.slice(1).toLowerCase();
            return nickname.includes(searchValue) || searchValue.includes(nickname);
          });

          if (filteredResults.length > 0) {
            setUserResults(filteredResults);
            setCachedResults((prev) => new Map(prev).set(searchQuery, filteredResults));
            setSearchError('');
          } else {
            setUserResults([]);
            if (showError) {
              setSearchError(`'${searchQuery.slice(1)}' 닉네임을 가진 사용자를 찾을 수 없습니다.`);
            }
          }
        } else {
          setUserResults([]);
          if (showError) {
            setSearchError(`'${searchQuery.slice(1)}' 닉네임을 가진 사용자를 찾을 수 없습니다.`);
          }
        }
      } catch (error) {
        console.error('Error fetching user search results:', error);
        setUserResults([]);
        if (showError) {
          setSearchError('사용자 검색 중 오류가 발생했습니다.');
        }
      }
    } else {
      // 태그 검색 처리
      try {
        const response = await getTagSearchResults(searchQuery);
        if (response && response.data.length > 0) {
          const tags = response.data.map((tag: any) => ({
            tagName: tag.tagName,
            tagImageUrl: tag.tagImageUrl,
            isPhoto: tag.isPhoto,
            isVideo: tag.isVideo
          }));
          setTagResults(tags);
          setCachedResults((prev) => new Map(prev).set(searchQuery, tags));
          setSearchError('');
        } else {
          setTagResults([]);
          if (showError) {
            setSearchError(`'${searchQuery}' 태그를 찾을 수 없습니다.`);
          }
        }
      } catch (error) {
        console.error('Error fetching tag search results:', error);
        setTagResults([]);
        if (showError) {
          setSearchError('태그 검색 중 오류가 발생했습니다.');
        }
      }
    }

    setIsDropdownOpen(true);
  };

  // 디바운스된 검색 함수
  const debouncedSearch = useCallback(debounce((query: string) => performSearch(query), 300), [cachedResults]);

  // 검색어 입력 필드에 변화가 있을 때 호출됨
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchError('');

    if (newSearchTerm !== '@') {
      debouncedSearch(newSearchTerm);
    }
  };

  // Enter 키를 누르면 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm !== '@') {
        performSearch(searchTerm, true);

        // 검색어를 최근 검색에 추가
        if (isSearchRecentEnabled && !searchRecent.includes(searchTerm)) {
          setSearchRecent((prevRecent) => [searchTerm, ...prevRecent].slice(0, 30));
        }
      }
    }
  };

  // 검색 폼 제출 시 검색 실행
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm !== '@') {
      performSearch(searchTerm, true);

      // 검색어를 최근 검색에 추가
      if (isSearchRecentEnabled && !searchRecent.includes(searchTerm)) {
        setSearchRecent((prevRecent) => [searchTerm, ...prevRecent].slice(0, 30));
      }
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    router.push(`/search/posts?keyword=${tag}`);

    if (isSearchRecentEnabled && !searchRecent.includes(tag)) {
      setSearchRecent((prevRecent) => [tag, ...prevRecent].slice(0, 30));
    }
  };

  const handleProfileClick = (nickname: string) => {
    const searchFormat = `@${nickname}`;
    router.push(`/profile/${nickname}`);

    if (isSearchRecentEnabled && !searchRecent.includes(searchFormat)) {
      setSearchRecent((prevRecent) => [searchFormat, ...prevRecent].slice(0, 30));
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.dropdown-container') && !target.closest('.search-input')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 최근 검색어 초기화
  const handleClearRecent = () => {
    setSearchRecent([]);
  };

  const toggleSearchRecent = () => {
    setIsSearchRecentEnabled((prevState) => !prevState);
  };

  const filteredWords = searchTerm
    ? posts.filter((post) =>
        post.data.tags[0].tagName.toLowerCase().includes(searchTerm.toLowerCase())
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
              isDropdownOpen ? (searchTerm.startsWith('@') ? 'bg-orange bg-opacity-20' : 'bg-purple bg-opacity-20') : 'bg-lightGray'
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
          />
          <>
            {!searchTerm.startsWith('@') ? (
              <SearchWord
                searchWords={filteredWords}
                onTagClick={handleTagClick}
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
