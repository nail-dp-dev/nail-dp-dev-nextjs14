import { useState } from 'react';
import { posts } from '../../../constants/example';

export default function SearchWord() {
  const [searchWords, setSearchWords] = useState(posts);

  return (
    <div
      className="bg-purple  flex flex-wrap gap-2.5 overflow-auto
        xs:max-h-[470px]
        sm:max-h-[470px]
        md:max-h-[470px]
        lg:max-h-[350px]"
    >
      {searchWords.map((item, index) => (
        <button
          key={index}
          className="relative bg-textDarkPurple p-3 
            w-full h-[110px]
            xs:w-[calc(50%-6px)]
            sm:w-[calc(50%-6px)] 
            md:w-[calc(33.333%-7px)]
            lg:w-[calc(25%-8px)] 
            xl:w-[calc(20%-8px)] 
            2xl:w-[calc(14.444%-12px)] 2xl:grow 2xl:max-w-[14%] 
            3xl:w-[calc(14.444%-12px)] 3xl:max-w-[8.75%] 
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
