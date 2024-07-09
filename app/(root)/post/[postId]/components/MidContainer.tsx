import React, { useState, useEffect, useRef } from 'react';
import ChattingBox from './mid/ChattingBox';
import PostCount from './mid/PostCount';
import PostTags from './mid/PostTags';
import { CommentData, PostsDetailData } from '../../../../../types/dataType';

interface MidContainerProps {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
}

export default function MidContainer({ post, comments }: MidContainerProps) {
  const MAX_WIDTH = 550;
  const MIN_WIDTH = 300;
  const [imageBoxWidth, setImageBoxWidth] = useState(MAX_WIDTH);
  const startY = useRef(0);

  useEffect(() => {
    // 휠 감지
    const handleWheel = (event: WheelEvent) => {
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, imageBoxWidth - event.deltaY * 0.7),
      );
      setImageBoxWidth(newWidth);
    };
    // 터치 시작 감지
    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const deltaY = startY.current - event.touches[0].clientY;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, imageBoxWidth - deltaY * 0.7),
      );
      setImageBoxWidth(newWidth);
      startY.current = event.touches[0].clientY; // 업데이트 터치 시작 위치
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imageBoxWidth]);

  return (
    <div className=" h-screen overflow-auto ">
      <div className="mx-auto my-0 flex  w-full flex-col justify-center">
        <div className="BoxWrap relative mb-[50px] mt-5  flex justify-center">
          <div
            className={`ImageBox aspect-square bg-darkPurple transition-all duration-300 
            ${imageBoxWidth >= 500 ? 'min-w-[550px]' : 'min-w-[300px]'}`}
          >
            1231
          </div>
          <div
            className={`ContentBox ml-[15px] rounded-2.5xl bg-lightGray px-3 pt-[10px] text-sm font-light text-black transition-all duration-300 
            ${imageBoxWidth >= 500 ? 'w-[300px]' : 'min-w-[500px]'}`}
          >
            123asdasdaadsdasadsadsdas
          </div>
        </div>
        <div>
          <div className="postInfo  flex flex-wrap items-center justify-between border-2">
            <PostCount post={post} />
            <PostTags post={post} />
          </div>
          <div>
            <ChattingBox user={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
