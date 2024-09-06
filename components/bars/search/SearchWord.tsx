import { useEffect, useState } from 'react';
import { posts } from '../../../constants/example';

type TagResult = {
  tagName: string;
  tagImageUrl: string;
  photo: boolean;
  video: boolean;
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
    if (searchTerm.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const filteredResults = tagResults.filter((result) =>
        result.tagName.toLowerCase().includes(lowerCaseSearchTerm),
      );

      setDisplayWords(filteredResults);
    } else if (tagResults.length > 0) {
      setDisplayWords(tagResults);
    } else {
      setDisplayWords(
        searchWords.map((post) => ({
          tagName: post.data.tags[0].tagName,
          tagImageUrl: post.data.postImageUrls[0],
          photo: true,
          video: false,
        })),
      );
    }
  }, [searchWords, tagResults, searchTerm]);

  return (
    <div>
      <p className="text-14px-normal-dP">
        {searchTerm.length > 0 ? '연관 검색어' : '추천 검색어'}
      </p>
      <div
        className="mt-[5px] grid auto-rows-auto grid-cols-5 gap-2.5 overflow-auto 
        xs:max-h-[470px]
        sm:max-h-[470px] 
        lg:max-h-[350px] 
        xl:max-h-[230px]"
      >
        {displayWords.map((item, index) => (
          <button
            key={index}
            className="relative flex h-[110px] 
            w-full  items-center
            justify-center rounded-2xl bg-purple p-3"
            onClick={() => {
              onTagClick(item.tagName);
            }}
          >
            {item.video ? (
              <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl">
                <video
                  src={item.tagImageUrl}
                  autoPlay
                  loop
                  muted
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50"></div>
              </div>
            ) : item.photo && item.tagImageUrl ? (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${item.tagImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50"></div>
              </div>
            ) : (
              <div
                className={`absolute inset-0 rounded-2xl ${
                  item.video || item.photo
                    ? 'bg-black bg-opacity-50'
                    : 'bg-purple'
                }`}
              ></div>
            )}

            <div className="relative z-10 text-[0.94rem] font-extrabold text-white">
              {item.tagName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
