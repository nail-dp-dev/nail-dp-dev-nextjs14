import { useEffect, useState } from 'react';
import { posts } from '../../../constants/example';

type SearchWordProps = {
  searchWords: typeof posts;
  onTagClick: (tag: string) => void;
  searchTerm: string;
};

// 검색어 컴포넌트
export default function SearchWord({
  searchWords,
  onTagClick,
  searchTerm,
}: SearchWordProps) {
  // 연관 검색어 랜덤 출력 (임시 함수)
  const [displayWords, setDisplayWords] = useState(() =>
    posts.sort(() => 0.5 - Math.random()).slice(0, 14),
  ); 

  useEffect(() => {
    setDisplayWords(searchWords);
  }, [searchWords]);

  return (
    <div className="">
      <p className="text-14px-normal-dP">
        {searchTerm.length > 0 ? '연관 검색어' : '추천 검색어'}
      </p>
      <div
        className="flex flex-wrap gap-2.5 overflow-auto snap-y mt-[5px]
        xs:max-h-[470px]
        sm:max-h-[470px]
        lg:max-h-[350px]
        xl:max-h-[230px]"
      >
        {displayWords.map((item, index) => (
          <button
            key={index}
            className="relative bg-textDarkPurple p-3 snap-start 
            w-full h-[110px]
            xs:w-[calc(50%-6px)]
            sm:w-[calc(50%-6px)] 
            md:w-[calc(33.333%-7px)]
            lg:w-[calc(25%-8px)] 
            xl:w-[calc(20%-8px)] 
            2xl:w-[calc(14.444%-12px)] 2xl:grow 2xl:max-w-[13.88%] 
            3xl:w-[calc(14.444%-12px)] 3xl:max-w-[9.59%]
            rounded-2xl flex flex-col justify-center  items-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.data.postImageUrl})`,
            }}
            onClick={() => onTagClick(item.data.tags[0].tagName)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
            <div className="relative text-white text-[0.94rem] font-extrabold">
              {item.data.tags[0].tagName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
