'use client';

import { ChangeEvent, useState } from 'react';

export default function ContentContainer({ onContentChange }: any) {
  // 내용 작성 관련
  const [isContent, setIsContent] = useState('');

  const hashContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsContent(e.target.value);
    onContentChange(e.target.value);
  };

  return (
    <div className="flex h-[23vh] min-h-[156px] flex-col px-[16px] py-[12px]">
      <div className="pb-[8px] text-[1rem]">
        <span className="font-bold">내용</span>
      </div>
      <div className="h-full w-full overflow-hidden rounded-lg border border-postInputGray focus-within:border-purple">
        <textarea
          onChange={(e) => hashContentChange(e)}
          value={isContent}
          placeholder="내용을 입력해 주세요."
          className="h-full w-full resize-none rounded-lg p-[15px] focus:outline-none"
        />
      </div>
    </div>
  );
}
