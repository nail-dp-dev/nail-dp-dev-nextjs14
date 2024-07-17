'use client';

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import HashtagArrowIcon from '../../../../../public/assets/svg/hashtag-arrow.svg';

export default function HashTagContainer({ onHashTagChange }: any) {
  //태그 관련
  const [isTagList, setIsTagList] = useState([
    '#유광',
    '#무광',
    '#짧은손톱',
    '#긴손톱',
    '#케어',
    '#글러터',
    '#스퀘어',
    '#라운드스퀘어',
    '#아몬드',
    '#스탈레토',
    '#발레리나',
    '#라운드',
    '#오벌',
    '#오벌라운드',
    '#코핀',
    '#아크릴',
    '#연장',
  ]);

  const [isTagValue, setIsTagValue] = useState('');
  const [isUserHashTags, setIsUserHashTags] = useState<string[]>([]);
  const [isHashTagState, setIsHashTagState] = useState(true);
  const [isHashTagButton, setIsHashTagButton] = useState(false);

  const addUserHashTagClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    i: string,
  ) => {
    e.preventDefault();
    if (isUserHashTags.includes(i)) {
      setIsUserHashTags(isUserHashTags.filter((tag) => tag !== i));
      if (isUserHashTags.length == 1) {
        setIsHashTagState(true);
        setIsHashTagButton(false);
      }
    } else {
      setIsUserHashTags([...isUserHashTags, i]);
      onHashTagChange([...isUserHashTags, i]);
    }
  };

  const addUserHashTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.nativeEvent.isComposing === false && isTagValue.trim() !== '') {
        setIsUserHashTags([...isUserHashTags, `#${isTagValue.trim()}`]);
        onHashTagChange([...isUserHashTags, `#${isTagValue.trim()}`]);
        setIsTagValue('');
        setIsHashTagButton(true);
        if (isHashTagButton != isHashTagState) {
          setIsHashTagState(false);
        }
      }
    }
  };

  const hashTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTagValue(e.target.value);
  };

  const hashTagAll = (e: MouseEvent) => {
    e.preventDefault();
    setIsHashTagState(!isHashTagState);
  };

  return (
    <>
      {/* 해시태그 */}
      <div className="flex flex-col px-[16px] py-[12px]">
        <div className="pb-[8px] text-[16px]">
          <span className="font-bold">해시태그</span>
          <span className="text-red">*</span>
        </div>
        <div className="flex h-[56px] w-full items-center rounded-lg border border-postInputGray text-center focus-within:border-purple">
          <input
            className="flex-1 rounded-lg p-[15px] text-[16px] focus:outline-none"
            type="text"
            placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
            value={isTagValue}
            onChange={(e) => hashTagChange(e)}
            onKeyDown={(e) => addUserHashTagKey(e)}
          />
          <button
            onClick={(e) => hashTagAll(e)}
            className={`group mr-[15px] h-[13px] w-[21px] ${isHashTagButton ? '' : 'hidden'}`}
          >
            <HashtagArrowIcon
              className={`fill-current ${isHashTagState ? 'fill-purple' : 'fill-buttonDarkGray'} group-hover:fill-purple`}
            />
          </button>
        </div>
      </div>
      {isHashTagButton && (
        <div className="flex p-[12px]">
          {isUserHashTags.map((item, index) => (
            <button
              onClick={(e) => addUserHashTagClick(e, item)}
              className={`hashtag-layout hashtag-hover-active button-tr-tf button-tr my-[4px] ml-[4px] bg-purple
                ${isTagList.includes(item) ? '' : 'text-white'}`}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {isHashTagState && isHashTagButton && (
        <div className="w-full px-[16px]">
          <div className="w-full border border-buttonDarkGray" />
        </div>
      )}
      {isHashTagState && (
        <div className="felx px-[12px] pb-[28px] pt-[12px]">
          {isTagList.map((item, index) => (
            <button
              onClick={(e) => addUserHashTagClick(e, item)}
              className={`hashtag-layout hashtag-hover-active button-tr-tf button-tr my-[4px] ml-[4px] bg-hashTagGray
                  ${isUserHashTags.includes(item) ? 'bg-purple' : ''}`}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
