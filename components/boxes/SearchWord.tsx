import { useState } from 'react';
import { posts } from '../../constants/example';

export default function SearchWord() {
  const [searchWords, setSearchWords] = useState(posts);

  return (
    <div className="bg-purple flex flex-wrap gap-2.5">
      {searchWords.map((item, index) => (
        <button
          key={index}
          className="bg-textDarkPurple p-3 overflow-hidden 
          w-full
          sm:w-[calc(50%-10px)]
          md:w-[calc(33.333%-10px)]
          lg:w-[calc(25%-10px)] 
          xl:w-[calc(20%-10px)] 
          2xl:w-[calc(16.7%-10px)] h-[110px] 
          rounded-2xl flex flex-col justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.data.postImageUrl})`,
          }}
        >
          <div className="text-white text-[0.94rem] font-extrabold">
            {item.data.tags[0].tagName}
          </div>
        </button>
      ))}
    </div>
  );
}
