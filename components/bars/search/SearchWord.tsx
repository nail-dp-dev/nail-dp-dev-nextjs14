import { useEffect, useState, useCallback } from 'react';
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

// 태그 검색 결과
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
      const searchTerms = lowerCaseSearchTerm.split(' ').filter(Boolean);

      const filteredResults = tagResults.filter((result) => {
        const tagNameLower = result.tagName.toLowerCase();
        return searchTerms.some((term) => tagNameLower.includes(term));
      });

      const uniqueResults = Array.from(
        new Set(filteredResults.map((item) => item.tagName)),
      ).map((tagName) =>
        filteredResults.find((item) => item.tagName === tagName),
      );

      setDisplayWords(uniqueResults as TagResult[]);
    } else if (tagResults.length > 0) {
      setDisplayWords(tagResults);
    } else {
      const recommendedWords = searchWords.map((post) => ({
        tagName: post.data.tags[0].tagName,
        tagImageUrl: post.data.postImageUrls[0],
        photo: true,
        video: false,
      }));

      setDisplayWords(recommendedWords);
    }
  }, [searchWords, tagResults, searchTerm]);

  const handleTagClick = useCallback(
    (tagName: string) => {
      onTagClick(tagName);
    },
    [onTagClick],
  );

  const isMediaType = (url: string) => {
    let isPhoto = false;
    let isVideo = false;

    if (url !== null && url !== 'default.jpg') {
      isPhoto =
        url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif');

      isVideo = url.endsWith('.mp4') || url.endsWith('.mov');
    }

    return { isPhoto, isVideo };
  };

  return (
    <div>
      <p className="text-14px-normal-dP">
        {searchTerm.length > 0 ? '연관 검색어' : '추천 검색어'}
      </p>
      <div
        className="tag-wrap mt-[5px] grid max-h-[200px] 
          auto-rows-auto grid-cols-2 gap-2.5 overflow-auto 
          xs:max-h-[300px] xs:grid-cols-2
          sm:max-h-[300px] sm:grid-cols-2 
          md:max-h-[350px] md:grid-cols-5 
          lg:max-h-[400px] xl:max-h-[450px]"
      >
        {displayWords.map((item, index) => {
          const { isPhoto, isVideo } = isMediaType(item.tagImageUrl);

          return (
            <button
              key={index}
              className="relative flex h-[110px] 
              w-full items-center
              justify-center rounded-2xl bg-purple p-3"
              onClick={() => handleTagClick(item.tagName)}
            >
              {isVideo ? (
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl">
                  <video
                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${item.tagImageUrl}`}
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
              ) : isPhoto && item.tagImageUrl !== 'default.jpg' ? (
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
                <div className="absolute inset-0 rounded-2xl bg-darkPurple"></div>
              )}

              <div className="relative z-10 text-[0.94rem] font-extrabold text-white">
                {item.tagName}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
