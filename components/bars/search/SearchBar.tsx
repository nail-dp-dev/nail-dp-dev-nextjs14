'use client';

import SearchIcon from '../../../public/assets/svg/search.svg';
import CloseIcon from '../../../public/assets/svg/close.svg';
import { useEffect, useState } from 'react';
import SearchHistory from './SearchHistory';

export default function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm('');
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest('.dropdown-container') &&
      !target.closest('.search-input')
    ) {
      setIsDropdownOpen(false);
    }
    console.log('드롭다운');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full z-20">
      <form
        className="flex items-center p-2 relative z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full">
          <input
            className={`search-input py-3 px-4 pl-12 w-full rounded-full focus:outline-none placeholder:text-sm placeholder:text-darkPurple placeholder:font-normal 
            ${isDropdownOpen ? 'bg-purple bg-opacity-20' : 'bg-lightGray'}`}
            type="text"
            value={searchTerm}
            placeholder="다양한 네일 디자인을 검색해보세요."
            onClick={handleInputClick}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <SearchIcon />
          </div>
          {isDropdownOpen && (
            <button
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
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
          className="form-container absolute top-0 left-0 w-full bg-white border-2 border-purple 
          rounded-2xl shadow-search-shadow bg-opacity-80 min-h-[25rem] p-[10px] dropdown-container z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <SearchHistory />
        </div>
      )}
    </div>
  );
}
