'use client';

import { MouseEvent, SetStateAction, useState } from 'react';
import { SettingElements } from '../../../../constants';
import ThemeToggle from './components/ThemeToggle';

export default function SettingPage() {
  const [isMenuBar, setISMenuBar] = useState('구독/결제 관리');

  const MenuBarClick = (e: any, name: string) => {
    e.stopPropagation();
    setISMenuBar(name);
  };

  return (
    <div className="SettingContainer h-full w-full">
      <div className="bg-white py-[16px] dark:bg-themeDark">
        <p className="text-[28px] font-bold text-textBlack dark:text-white">
          환경설정
        </p>
      </div>
      <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
        <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
          <div className="flex h-[53px] gap-[32px]">
            {SettingElements.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    MenuBarClick(e, item.name);
                  }}
                  className={`inline-flex h-[100%] min-w-[30px] items-center justify-center border-b-[3px] ${isMenuBar === item.name ? 'border-purple' : 'border-darkGray'} transition-all`}
                >
                  <p className="text-[0.875rem] font-[700] text-textBlack">
                    {item.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-[13px] w-full"></div>
      </div>
      <div className="h-[32px] w-full bg-purple"></div>
      <ThemeToggle />
      {/* 여기가 변경 */}
      <div>
        {/* <img src="" alt="" /> */}
        <button className="button-layout bg-purple">기본 버튼 레이아웃</button>
        <button className="button-layout button-tt bg-buttonLightGray px-[33px]  py-[9.5px] text-textBlack">
          임시 저장
        </button>
        <button className="button-layout button-color px-[10px] py-[5.5px]">
          새로운 아카이브 만들기
        </button>
        <button className="button-layout  button-color px-[21px] py-[9.5px]">
          사진 추가하기
        </button>
        <button className="hashtag-layout hashtag-hover-active button-tr-tf button-transition bg-lightGray">
          #케어
        </button>
        <button className="hashtag-layout hashtag-hover-active button-tr bg-purple">
          #라운드
        </button>
      </div>
    </div>
  );
}
