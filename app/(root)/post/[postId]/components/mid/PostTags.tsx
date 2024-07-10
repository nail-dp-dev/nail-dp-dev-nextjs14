import React, { useRef } from 'react';
import { PostsDetailData } from '../../../../../../types/dataType';

interface PostTagsProps {
  post: PostsDetailData['data'];
}

export default function PostTags({ post }: PostTagsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
    const walk = (x - startX.current) * 2; // Scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      className="relative 
      sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[800px] 
      overflow-x-hidden bg-red"
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
              className="hashtag-layout  hashtag-hover-active button-tr button-tr-tf
              bg-hashTagGray hover:text-white active:text-white"
            >
              {tag.tagName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
