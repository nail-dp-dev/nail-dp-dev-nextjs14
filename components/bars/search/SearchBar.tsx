'use client';

import SearchIcon from '../../../public/assets/svg/search.svg';
import CloseIcon from '../../../public/assets/svg/close.svg';
import { useEffect, useState } from 'react';
import SearchRecent from './SearchRecent';
import SearchWord from './SearchWord';
import { posts, followData } from '../../../constants/example';
import RecentButton from '../../buttons/RecentButton';
import SearchFollow from './SearchFollow';

export default function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRecent, setSearchRecent] = useState<string[]>([]);
  const [recommendedWords, setRecommendedWords] = useState(() =>
    posts.sort(() => 0.5 - Math.random()).slice(0, 14),
  );
  const [searchError, setSearchError] = useState('');
  const [isSearchRecentEnabled, setIsSearchRecentEnabled] = useState(true);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm('');
    setSearchError('');
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery && !searchRecent.includes(searchQuery)) {
      if (isSearchRecentEnabled) {
        setSearchRecent((prevRecent) =>
          [searchQuery, ...prevRecent].slice(0, 30),
        );
      }
    }

    const filteredWords = posts.filter((post) =>
      post.data.tags[0].tagName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    const filteredFollow =
      searchQuery.startsWith('@') && searchQuery.length > 1
        ? followData.filter(
            (user) =>
              user.data.nickname
                .toLowerCase()
                .includes(searchQuery.slice(1).toLowerCase()) ||
              searchQuery
                .slice(1)
                .toLowerCase()
                .includes(user.data.nickname.toLowerCase()),
          )
        : [];

    // 검색 결과 확인 및 오류 메시지 설정
    if (filteredWords.length === 0 && filteredFollow.length === 0) {
      if (searchQuery.startsWith('@') && searchQuery.length > 1) {
        setSearchError(
          `'${searchQuery.slice(1)}' 닉네임을 가진 사용자를 찾을 수 없습니다.`,
        );
      } else if (!searchQuery.startsWith('@')) {
        setSearchError(`'${searchQuery}' 검색결과를 찾을 수 없습니다.`);
      }
    } else {
      setSearchError('');
    }

    setIsDropdownOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm !== '@') {
      handleSearch(searchTerm);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    handleSearch(tag);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchError('');
  };

  const handleClearRecent = () => {
    setSearchRecent([]);
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
            focus:outline-none ${isDropdownOpen ? (searchTerm.startsWith('@') ? 'bg-orange bg-opacity-20' : 'bg-purple bg-opacity-20') : 'bg-lightGray'}`}
            type="text"
            value={searchTerm}
            placeholder="다양한 네일 디자인을 검색해보세요."
            onClick={handleInputClick}
            onChange={handleChange}
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
              <CloseIcon />
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
              />
            ) : (
              searchTerm.length > 1 && (
                <SearchFollow
                  searchTerm={searchTerm}
                  onTagClick={handleTagClick}
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
