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
  // 최대, 최소 박스 크기 및 초기 크기 설정
  const MAX_WIDTH = 550;
  const MIN_WIDTH = 300;
  const INITIAL_WIDTH = MAX_WIDTH; // 초기 박스 크기 저장
  const [imageBoxWidth, setImageBoxWidth] = useState(INITIAL_WIDTH); // 박스 크기 상태
  const containerRef = useRef<HTMLDivElement>(null); // 컨테이너 참조
  const chatBoxRef = useRef<HTMLDivElement>(null); // 채팅 박스 참조
  const [isScrolledDown, setIsScrolledDown] = useState(false); // 스크롤 상태
  const startY = useRef(0); // 터치 시작 위치

  // 박스 크기를 조정하는 함수
  const adjustBoxSize = (deltaY: number) => {
    const newWidth = Math.max(
      MIN_WIDTH,
      Math.min(MAX_WIDTH, imageBoxWidth - deltaY * 0.7),
    );
    setImageBoxWidth(newWidth);
  };
  // 스크롤 토글 함수
  const toggleScroll = () => {
    if (containerRef.current && chatBoxRef.current) {
      const scrollAmount = 240; // 스크롤 양
      const scrollDownTarget = containerRef.current.scrollTop + scrollAmount; // 아래로 스크롤 목표
      const scrollUpTarget = 0; // 위로 스크롤 목표
      const scrollTarget = isScrolledDown ? scrollUpTarget : scrollDownTarget; // 목표 스크롤 위치 설정

      adjustBoxSize(scrollAmount);

      // 초기 크기로 복원
      if (isScrolledDown && imageBoxWidth < INITIAL_WIDTH) {
        setImageBoxWidth(INITIAL_WIDTH);
      }

      // 스크롤 수행
      containerRef.current.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });

      // 스크롤 상태 토글
      setIsScrolledDown(!isScrolledDown);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (containerRef.current) {
        setIsScrolledDown(containerRef.current.scrollTop > 0);
      }
    };

    // 휠 이벤트 핸들러
    const handleWheel = (event: WheelEvent) => {
      adjustBoxSize(event.deltaY);
    };

    // 터치 시작 이벤트 핸들러
    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };
    // 터치 이동 이벤트 핸들러
    const handleTouchMove = (event: TouchEvent) => {
      const deltaY = startY.current - event.touches[0].clientY;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, imageBoxWidth - deltaY * 0.7),
      );
      setImageBoxWidth(newWidth);
      startY.current = event.touches[0].clientY;
    };

    // 이벤트 리스너 추가
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    // 클린업: 이벤트 리스너 제거
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imageBoxWidth]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll">
      <div className="mx-auto my-0 flex w-full flex-col justify-center">
        <div className="BoxWrap sticky mb-[50px] mt-5 flex justify-center">
          <div
            className={`ImageBox aspect-square bg-darkPurple transition-all duration-300 ${
              imageBoxWidth >= 500 ? 'min-w-[550px]' : 'min-w-[300px]'
            }`}
          >
            1231
          </div>
          <div
            className={`ContentBox ml-[15px] rounded-2.5xl bg-lightGray px-3 pt-[10px] text-sm font-light text-black transition-all duration-300 ${
              imageBoxWidth >= 500 ? 'w-[300px]' : 'min-w-[500px]'
            }`}
          >
            123asdasdaadsdasadsadsdas
          </div>
        </div>
        <div>
          <div className="postInfo flex flex-wrap items-center justify-between border-2">
            <PostCount post={post} toggleScroll={toggleScroll} />
            <PostTags post={post} />
          </div>
          <div ref={chatBoxRef}>
            <ChattingBox user={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
