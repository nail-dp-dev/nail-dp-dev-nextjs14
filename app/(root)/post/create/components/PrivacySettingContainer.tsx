'use client';

import { ChangeEvent, useState } from 'react';

export default function PrivacySettingContainer({onBoundaryChange}:any) {
  // 공개 관련
  const [isBoundary, setIsBoundary] = useState('ALL');

  const boundaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBoundary(e.target.value);
    onBoundaryChange(e.target.value);
  };

  return (
    <div className="px-[16px] pb-[50px] pt-[12px]">
      <p className="pb-[8px] text-[1rem] font-bold">공개 범위 설정</p>
      <div className="flex">
        <div className="mr-[16px] flex items-center hover:border-purple">
          <input
            className="mr-[10px] h-[16px] w-[16px]"
            type="radio"
            name="public-radio"
            id="public-1"
            value="ALL"
            onChange={boundaryChange}
            defaultChecked
          />
          <label className="text-[0.875rem] font-bold" htmlFor="public-1">
            공개
          </label>
        </div>
        <div className="mr-[16px] flex items-center">
          <input
            className="mr-[10px] h-[16px] w-[16px] "
            type="radio"
            name="public-radio"
            id="public-2"
            value="NONE"
            onChange={boundaryChange}
          />
          <label className="text-[0.875rem] font-bold" htmlFor="public-2">
            비공개
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="mr-[10px] h-[16px] w-[16px] "
            type="radio"
            name="public-radio"
            id="public-3"
            value="FOLLOW"
            onChange={boundaryChange}
          />
          <label className="text-[0.875rem] font-bold" htmlFor="public-3">
            팔로워 공개
          </label>
        </div>
      </div>
    </div>
  );
}
