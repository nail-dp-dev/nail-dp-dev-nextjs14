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
      <div className="tagDiv  flex h-[53px] w-full items-center justify-between overflow-hidden border-b-[1px] border-navBotSolidGray">
        <div className="flex gap-[5px] overflow-hidden ">
          {visibleTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagClick(tag.name)}
              className={`hashtag-layout  hashtag-hover-active button-tr button-tr-tf flex-shrink-0 items-center justify-center border-none bg-hashTagGray transition-all`}
            >
              <p className="text-[14px] font-[700]">{tag.name}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-shrink-0 items-center gap-[32px]">
          <button
            onClick={() => dispatch(decreaseBoxes())}
            disabled={numberOfBoxes <= 3}
            className="h-[24px]"
          >
            <MinusSVG />
          </button>
          <button
            onClick={() => dispatch(increaseBoxes())}
            disabled={numberOfBoxes >= 7}
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