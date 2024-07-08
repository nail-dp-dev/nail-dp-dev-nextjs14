'use client';

import { ChangeEvent, useState } from 'react';

export default function ContentContainer({onContentChange}:any) {
  // 내용 작성 관련
  const [isContent, setIsContent] = useState('');

  const hashContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsContent(e.target.value);
    onContentChange(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-[156px] h-[23vh] px-[16px] py-[12px]">
      <div className="pb-[8px] text-[16px]">
        <span className="font-bold">내용</span>
        <span className={`text-red ${isContent.length > 0 ? 'hidden' : ''}`}>
          *
        </span>
      </div>
      <div className="h-full w-full overflow-hidden rounded-lg border border-postInputGray focus-within:border-purple">
        <textarea
          onChange={(e) => hashContentChange(e)}
          value={isContent}
          className="h-full w-full resize-none rounded-lg p-[15px] focus:outline-none"
        />
      </div>
    </div>
  );
}
