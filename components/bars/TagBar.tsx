'use client';

import React from 'react';
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

interface TagBarProps {
  onTagClick: (tag: string) => void;
  isLikedOnly: boolean;
  activeTags: string[];  
}

export default function TagBar({ onTagClick, isLikedOnly, activeTags }: TagBarProps) {
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );
  const isLoggedIn = useSelector(selectLoginStatus);

  const filteredTags = tagElements.filter(tag => !activeTags.includes(tag.name));

  return (
    <div className="tagBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
      <div
        className="tagDiv flex h-[53px] w-full items-center 
      justify-between border-b-[1px] border-navBotSolidGray"
      >
        <div className="flex flex-wrap gap-[5px]">
          {filteredTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onTagClick(tag.name)}  
              className={`hashtag-layout hashtag-hover-active button-tr button-tr-tf items-center justify-center
                border-none bg-hashTagGray transition-all`}
            >
              <p className="text-[14px] font-[700]">{tag.name}</p>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-[32px]">
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
