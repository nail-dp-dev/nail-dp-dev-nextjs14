import { useState } from 'react';
import { posts } from '../../../constants/example';

export default function SearchWord() {
  const [searchWords, setSearchWords] = useState(posts);

  return (
    <div
      className="flex flex-wrap gap-2.5 overflow-auto snap-y
        xs:max-h-[480px]
        sm:max-h-[480px]
        lg:max-h-[360px]
        xl:max-h-[240px]"
    >
      {searchWords.map((item, index) => (
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
            3xl:w-[calc(14.444%-12px)] 3xl:max-w-[9.59%]  3xl:grow
            rounded-2xl flex flex-col justify-center  items-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.data.postImageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
          <div className="relative text-white text-[0.94rem] font-extrabold">
            {item.data.tags[0].tagName}
          </div>
        </button>
      ))}
    </div>
  );
}
