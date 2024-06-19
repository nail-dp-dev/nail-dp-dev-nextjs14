'use client';

import SearchIcon from '../../public/assets/svg/search.svg';
import { useEffect, useState } from 'react';
export default function Search() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !(e.target instanceof HTMLElement) ||
      !e.target.closest('.search-bar')
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-full search-bar ">
      <form className="flex items-center">
        <div className="relative w-full m-2">
          <input
            className="py-3 px-4 pl-12 w-full  rounded-full bg-lightGray focus:outline-none placeholder:text-sm placeholder:text-darkPurple placeholder:font-normal"
            type="text"
            placeholder="다양한 네일 디자인을 검색해보세요."
            onClick={handleInputClick}
          />
          <button
            className="absolute inset-y-0 left-0 pl-4 flex items-center"
            type="submit"
          >
            <SearchIcon />
          </button>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 w-full bg-white border-2 border-purple 
          rounded-2xl shadow-search-shadow"
          >
            <ul>
              <li className="px-4 py-2 cursor-pointer">1</li>
              <li className="px-4 py-2 cursor-pointer">2</li>
              <li className="px-4 py-2 cursor-pointer">3</li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
