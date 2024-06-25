'use client';

import SearchIcon from '../../../public/assets/svg/search.svg';
import CloseIcon from '../../../public/assets/svg/close.svg';
import { useEffect, useState } from 'react';
import SearchHistory from './SearchHistory';

export default function Search() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest('.search-bar')) {
      setIsDropdownOpen(false);
    }
    console.log('드롭다운');
  };

  const handleCloseClick = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => handleOutsideClick(e);

    if (isDropdownOpen) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative w-full  search-bar z-20  ">
      <form className="flex items-center p-2">
        {isDropdownOpen && (
          <div
            className="form-container absolute top-0 left-0 w-full bg-white border-2 border-purple 
          rounded-2xl shadow-search-shadow bg-opacity-80  min-h-[25rem] p-[10px]"
          >
            <SearchHistory />
          </div>
        )}
        <div className="relative w-full ">
          <input
            className={` py-3 px-4 pl-12 w-full rounded-full focus:outline-none placeholder:text-sm placeholder:text-darkPurple placeholder:font-normal 
            ${isDropdownOpen ? 'bg-purple bg-opacity-20' : 'bg-lightGray'}`}
            type="text"
            value={searchTerm}
            placeholder="다양한 네일 디자인을 검색해보세요."
            onClick={handleInputClick}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute inset-y-0 left-0 pl-4 flex items-center"
            type="submit"
          >
            <SearchIcon />
          </button>
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
    </div>
  );
}
