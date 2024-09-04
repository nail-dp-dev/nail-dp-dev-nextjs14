import React, { useRef } from 'react';
import { useRouter } from 'next/navigation'; // useRouter를 import 합니다.
import { PostsDetailData } from '../../../../../../../types/dataType';

interface PostTagsProps {
  post: PostsDetailData['data'];
  searchRecent: string[];
  setSearchRecent: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PostTags({ post, searchRecent, setSearchRecent }: PostTagsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const router = useRouter();
  const LOCAL_STORAGE_KEY = 'recentSearchTags';

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      isDragging.current = true;
      startX.current = event.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    event.preventDefault();
    const x = event.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // 해시태그 클릭 시 호출될 함수
  const handleTagClick = (tag: string) => {
    // URL 이동
    router.push(`/search/posts?keyword=${encodeURIComponent(tag)}`);
    
    // 최근 검색어에 추가
    addSearchTermToRecent(tag);
  };

  // 검색어를 최근 검색어에 추가하는 함수
  const addSearchTermToRecent = (term: string) => {
    if (!searchRecent.includes(term)) {
      const updatedRecent = [term, ...searchRecent].slice(0, 30);
      setSearchRecent(updatedRecent);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedRecent));
    }
  };

  return (
    <div
      className="relative 
      overflow-x-hidden   xs:max-w-[300px]  sm:max-w-[400px] md:max-w-[500px] lg:max-w-[400px] 
      xl:max-w-[600px] 2xl:max-w-[800px]"
      onWheel={handleWheel}
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="group flex flex-nowrap gap-[6px]">
        {post.tags.map((tag, index) => (
          <div className="flex-shrink-0 whitespace-nowrap" key={index}>
            <button
              className="hashtag-layout hashtag-hover-active button-tr button-tr-tf
              bg-hashTagGray hover:text-white active:text-white"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
