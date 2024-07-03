'use client';

import { useState } from 'react';
import CloseIcon from '../../../../public/assets/svg/bigclose.svg';
import HashtagArrowIcon from '../../../../public/assets/svg/hashtag-arrow.svg';

export default function PostCreate() {
  const [isTagList, setIsTagList] = useState([
    '유광',
    '무광',
    '짧은손톱',
    '긴손톱',
    '케어',
    '글러터',
    '스퀘어',
    '라운드스퀘어',
    '아몬드',
    '스탈레토',
    '발레리나',
    '라운드',
    '오벌',
    '오벌라운드',
    '코핀',
    '아크릴',
    '연장',
  ]);

  return (
    <section className="CreatePostContainer flex flex-col items-center w-full h-full overflow-y-scroll scrollbar-hide">
      <div className="sticky top-0 flex w-full h-max-[72px] justify-end my-[16px] bg-white">
        <button className="w-[124px] h-[40px] mr-[12px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">
          임시저장
        </button>
        <button className="w-[124px] h-[40px] mr-[12px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">
          업로드
        </button>
      </div>
      <form className="h-full w-[55%] min-w-[512px]" action="">
        <div className="flex flex-col h-full">
          <div className="flex flex-col px-[16px] py-[12px] h-[40%]">
            <div className="flex mb-[24px]">
              <p className="flex-1 text-[24px] font-bold text-center">
                새 게시글 작성
              </p>
              <button>
                <CloseIcon />
              </button>
            </div>
            <div className="w-full h-full text-center border-2 border-postInputGray border-dashed rounded-lg relative">
              <div className="absolute bottom-[13px] w-full">
                <p className="text-[18px]">
                  네일아트 디자인을 업로드해 보세요.
                </p>
                <button className="w-[124px] h-[40px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple mt-[24px]">
                  사진 추가하기
                </button>
                <p className="mt-[24px] mb-[13px] text-[16px]">(최대 10장)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-[16px] py-[12px] h-[25%]">
            <p className="text-[16px] font-bold pb-[8px]">내용</p>
            <div className="w-full h-full border border-postInputGray rounded-lg overflow-hidden">
              <textarea className="w-full h-full p-[15px] rounded-lg resize-none" />
            </div>
          </div>
          <div className="px-[16px] py-[12px] h-[35%]">
            <p className="text-[16px] font-bold pb-[8px]">해시태그</p>
            <div className="w-full h-[56px] text-center border border-postInputGray rounded-lg">
              <input
                className="w-full text-[16px] p-[15px] rounded-lg"
                type="text"
                placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
              />
              <button className='hidden'>
                <HashtagArrowIcon/>
              </button>
            </div>
            <div className="felx py-[12px]">
              {isTagList.map((itme, index) => (
                <button
                  className="h-[32px] text-[14px] font-bold px-[16px] ml-[6px] mb-[6px] bg-postInputGray rounded-full hover:bg-purple"
                  key={index}
                >
                  {`#${itme}`}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[16px] py-[12px]">
          <p className="text-[16px] font-bold pb-[8px]">공개 범위 설정</p>
          <div className="flex">
            <div className="mr-[16px]">
              <input className="mr-[10px]" type="radio" name="" id="public" />
              <label htmlFor="">공개</label>
            </div>
            <div className="mr-[16px]">
              <input className="mr-[10px]" type="radio" name="" id="public" />
              <label htmlFor="">비공개</label>
            </div>
            <div>
              <input className="mr-[10px]" type="radio" name="" id="public" />
              <label htmlFor="">팔로워 공개</label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
