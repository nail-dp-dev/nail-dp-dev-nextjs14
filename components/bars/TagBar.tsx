'use client';

import React, { useState, useEffect } from 'react';
import { tagElements } from '../../constants';
import MinusSVG from '../../public/assets/svg/minus.svg';
import PlusSVG from '../../public/assets/svg/plus.svg';
import HeartButton from '../animations/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  decreaseBoxes,
  selectNumberOfBoxes,
  increaseBoxes,
} from '../../store/slices/boxLayoutSlice';
import { selectLoginStatus } from '../../store/slices/loginSlice';

interface Tag {
  name: string;
  desc: string;
}

interface TagBarProps {
  onTagClick: (tag: string) => void;
  isLikedOnly: boolean;
  activeTags: string[];
  searchTerm: string;
}

// 검색결과페이지에 있는 태그바
export default function TagBar({
  onTagClick,
  isLikedOnly,
  activeTags,
  searchTerm,
}: TagBarProps) {
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );
  const isLoggedIn = useSelector(selectLoginStatus);

  const [visibleTags, setVisibleTags] = useState<Tag[]>([]);

  // 태그 필터링
  useEffect(() => {
    const allActiveTags = new Set(activeTags.map((tag) => tag.trim()));
    if (searchTerm) {
      searchTerm.split(' ').forEach((term) => allActiveTags.add(term.trim()));
    }
    const filteredTags = tagElements.filter(
      (tag) => !allActiveTags.has(tag.name),
    );

    setVisibleTags(filteredTags);
  }, [activeTags, searchTerm]);

  return (
    <div className="tagBar  flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
      <div className="tagDiv  flex h-[53px] w-full items-center justify-between gap-[10px] border-b-[1px] border-navBotSolidGray">
        <div
          className="
          overflow-x-auto flex-1 h-full flex items-center w-[100px] hide-scrollbar"
        >
          <div className="group flex flex-nowrap gap-[6px] mr-auto">
            {visibleTags.map((tag, index) => (
              <div className="flex-shrink-0 whitespace-nowrap" key={index}>
                <button
                  className="hashtag-layout hashtag-hover-active button-tr button-tr-tf
                  bg-hashTagGray hover:text-white active:text-white"
                  onClick={() => onTagClick(tag.name)}
                >
                  {tag.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-[32px] w-[140px] h-full">
          <button
            onClick={() => dispatch(decreaseBoxes())}
            disabled={numberOfBoxes <= 3}
            className="h-[24px]"
          >
            <MinusSVG />
          </button>
          <button
            onClick={() => dispatch(increaseBoxes())}
            disabled={numberOfBoxes >= 4}
            className="h-[24px]"
          >
            <PlusSVG />
          </button>
          {isLoggedIn === 'loggedIn' && (
            <HeartButton
              width="29"
              height="24"
              isClicked={isLikedOnly}
              isGetAllLiked={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}