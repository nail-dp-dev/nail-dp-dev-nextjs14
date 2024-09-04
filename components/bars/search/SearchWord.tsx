import { useEffect, useState } from 'react';
import { posts } from '../../../constants/example';

type TagResult = {
  tagName: string;
  tagImageUrl: string;
  isPhoto: boolean;
  isVideo: boolean;
};

type SearchWordProps = {
  searchWords: typeof posts;
  onTagClick: (tag: string) => void;
  searchTerm: string;
  tagResults: TagResult[];
};

export default function SearchWord({
  searchWords,
  onTagClick,
  searchTerm,
  tagResults,
}: SearchWordProps) {
  const [displayWords, setDisplayWords] = useState<TagResult[]>([]);

  useEffect(() => {
    // 태그 결과 필터링 로직 수정
    if (searchTerm.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const filteredResults = tagResults.filter((result) =>
        result.tagName.toLowerCase().includes(lowerCaseSearchTerm)
      );

      setDisplayWords(filteredResults);
    } else if (tagResults.length > 0) {
      setDisplayWords(tagResults);
    } else {
      setDisplayWords(
        searchWords.map((post) => ({
          tagName: post.data.tags[0].tagName,
          tagImageUrl: post.data.postImageUrls[0],
          isPhoto: true,
          isVideo: false,
        }))
      );
    }
  }, [searchWords, tagResults, searchTerm]);

  return (
    <div className="">
      <p className="text-14px-normal-dP">
        {searchTerm.length > 0 ? '연관 검색어' : '추천 검색어'}
      </p>
      <div
        className="mt-[5px] flex snap-y flex-wrap gap-2.5 overflow-auto
        xs:max-h-[470px]
        sm:max-h-[470px]
        lg:max-h-[350px]
        xl:max-h-[230px]"
      >
        {displayWords.map((item, index) => (
          <button
            key={index}
            className="relative flex h-[110px] w-full 
            snap-start flex-col
            items-center
            justify-center 
            rounded-2xl
            bg-textDarkPurple 
            bg-cover 
            bg-center p-3 xs:w-[calc(50%-6px)] 
            sm:w-[calc(50%-6px)] md:w-[calc(33.333%-7px)]
            lg:w-[calc(25%-8px)] xl:w-[calc(20%-8px)] 2xl:w-[calc(14.444%-12px)] 2xl:max-w-[13.88%]  2xl:grow 3xl:w-[calc(14.444%-12px)] 3xl:max-w-[9.59%]"
            style={{
              backgroundImage: `url(${item.isPhoto ? item.tagImageUrl : ''})`,
            }}
            onClick={() => onTagClick(item.tagName)}
          >
            <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50"></div>
            <div className="relative text-[0.94rem] font-extrabold text-white">
              {item.tagName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
