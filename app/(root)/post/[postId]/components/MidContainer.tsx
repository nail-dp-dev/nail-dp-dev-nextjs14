import React from 'react';

export default function MidContainer() {
  return (
    <div className="flex h-[605px] items-center bg-kakaoYellow">
      <div className="mx-auto my-0  flex w-full max-w-[1200px] justify-center bg-red pb-[50px]  pt-5">
        <div
          className="aspect-square min-w-[300px] max-w-[535px] 
        flex-shrink flex-grow bg-darkPurple"
        >
          1231
        </div>
        <div
          className="ml-[15px] max-w-[350px] flex-shrink 
          flex-grow rounded-2.5xl bg-lightGray 
          px-3 pt-[10px] text-sm font-light text-black"
        >
          123asdasdaadsdasadsadsdas
        </div>
        {/* <PostBox /> */}
      </div>
    </div>
  );
}
