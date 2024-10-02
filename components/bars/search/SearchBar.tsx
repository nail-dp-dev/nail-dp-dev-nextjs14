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
import useLoggedInUserData from '../../../hooks/user/useLoggedInUserData';

function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const LOCAL_STORAGE_KEY = 'recentSearchTags';

// 검색바
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
  const { userData } = useLoggedInUserData();

  useEffect(() => {
    const extractNicknameFromPath = (pathname: string, userData: any) => {
      if (pathname === '/my-page' && userData?.data?.nickname) {
        return `@${userData.data.nickname}`;
      }
      if (pathname.startsWith('/profile/')) {
        const nicknameFromPath = pathname.split('/').pop();
        return nicknameFromPath
          ? `@${decodeURIComponent(nicknameFromPath)}`
          : undefined;
      }
      return undefined;
    };

    const nickname = extractNicknameFromPath(pathname, userData);

    if (nickname) {
      setSearchTerm(nickname);
      debouncedSearch(nickname);
    }
  }, [pathname, userData]);

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

  const performSearch = async (
    searchQuery: string,
    showError: boolean = false,
  ) => {
    // searchQuery가 없으면 검색 중단
    if (!searchQuery.trim()) {
      resetSearchResults();
      return;
    }

    try {
      const searchTerms = extractSearchTerms(searchQuery);

      if (isUserSearch(searchTerms[0])) {
        // 닉네임 검색 실행
        await handleUserSearch(searchTerms[0].slice(1), showError);
      } else {
        // 태그 검색 실행
        await handleTagSearch(searchTerms, showError);
      }
    } catch (error) {
      handleSearchError(showError, error);
    }
  };

  // 검색어 처리
  const extractSearchTerms = (query: string) =>
    query
      .split(' ')
      .filter(Boolean)
      .map((term) => term.toLowerCase());

  // 닉네임 검색 여부 확인
  const isUserSearch = (term: string) => term.startsWith('@');

  // 검색 결과 초기화
  const resetSearchResults = () => {
    setUserResults([]);
    setTagResults([]);
    setSearchError('');
  };

  // 닉네임 검색 처리
  const handleUserSearch = async (
    nicknameQuery: string,
    showError: boolean,
  ) => {
    const userSearchResults = await getUserSearchResults(nicknameQuery);

    if (userSearchResults?.data?.length > 0) {
      const filteredUsers = userSearchResults.data.filter((user: any) =>
        user.nickname.toLowerCase().includes(nicknameQuery),
      );
      setUserResults(filteredUsers);
      setSearchError('');
    } else {
      handleNoResultsError(
        showError,
        `'${nicknameQuery}' 닉네임을 가진 사용자를 찾을 수 없습니다.`,
      );
    }
  };

  // 태그 검색 처리
  const handleTagSearch = async (searchTerms: string[], showError: boolean) => {
    const newTagResults = await getTagSearchResults(searchTerms);

    if (newTagResults?.length > 0) {
      const filteredTags = filterTags(newTagResults, searchTerms);
      const notFoundTags = searchTerms.filter(
        (term) =>
          !newTagResults.some((tag: any) =>
            tag.tagName.toLowerCase().includes(term),
          ),
      );

      setTagResults(filteredTags);

      if (notFoundTags.length > 0) {
        setSearchError(`'${notFoundTags.join(', ')}' 태그를 찾을 수 없습니다.`);
      } else {
        setSearchError('');
      }
    } else {
      handleNoResultsError(
        showError,
        `'${searchTerms.join(', ')}' 태그를 찾을 수 없습니다.`,
      );
    }
  };

  // 태그 필터링
  const filterTags = (tags: any[], searchTerms: string[]) =>
    tags.filter((tag: any) =>
      searchTerms.some((term) => tag.tagName.toLowerCase().includes(term)),
    );

  // 검색 오류 처리
  const handleSearchError = (showError: boolean, error: any) => {
    console.error('Error fetching search results:', error);
    resetSearchResults();
    if (showError) {
      setSearchError('검색 중 오류가 발생했습니다.');
    }
  };

  // 검색 결과가 없을 때 처리
  const handleNoResultsError = (showError: boolean, errorMessage: string) => {
    setUserResults([]);
    setTagResults([]);
    if (showError) {
      setSearchError(errorMessage);
    }
  };

  // 검색 입력 값 변경 핸들러 수정
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchError('');

    if (newSearchTerm.trim() === '') {
      setTagResults([]); // 연관 검색어 초기화
      return;
    }
    debouncedSearch(newSearchTerm);
  };

  // Debounce로 API 호출 방지 설정
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      // 공백일 경우 API 호출 방지
      if (query.trim() !== '') {
        performSearch(query, true);
      }
    }, 300),
    [tagResults],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (searchTerm.trim() === '' || searchTerm.startsWith('@')) {
        addToRecentSearches(searchTerm);
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
    <div className="relative z-[18] w-full">
      <form
        className="relative z-[18] flex items-center py-2"
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
