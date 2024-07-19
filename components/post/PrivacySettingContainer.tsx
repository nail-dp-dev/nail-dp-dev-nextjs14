'use client';

import { ChangeEvent, useEffect, useState } from 'react';

export interface editData {
  editBoundary?: string;
  onBoundaryChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function PrivacySettingContainer({
  editBoundary,
  onBoundaryChange,
}: editData) {
  // 공개 관련
  const [isBoundary, setIsBoundary] = useState('ALL');
  
  useEffect(() => {
    if (editBoundary !== undefined) {
      setIsBoundary(editBoundary);
    }
  },[editBoundary]);

  const boundaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBoundary(e.target.value);
    onBoundaryChange(e.target.value);
  };

  return (
    <div className="px-[16px] pb-[50px] pt-[12px]">
      <p className="pb-[8px] text-[16px] font-bold">공개 범위 설정</p>
      <div className="flex">
        <div className="mr-[16px] flex items-center hover:border-purple">
          <input
            className="mr-[10px] h-[16px] w-[16px]"
            type="radio"
            name="public-radio"
            id="public-1"
            value="ALL"
            onChange={boundaryChange}
            checked={isBoundary === 'ALL'}
          />
          <label className="text-[14px] font-bold" htmlFor="public-1">
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
            checked={isBoundary === 'NONE'}
          />
          <label className="text-[14px] font-bold" htmlFor="public-2">
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
            checked={isBoundary === 'FOLLOW'}
          />
          <label className="text-[14px] font-bold" htmlFor="public-3">
            팔로워 공개
          </label>
        </div>
      </div>
    </div>
  );
}
