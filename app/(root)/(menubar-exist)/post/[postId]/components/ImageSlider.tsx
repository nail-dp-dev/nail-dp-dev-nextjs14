'use client';

import React, { useState, useEffect, useRef } from 'react';
import ArrowLeft from '../../../../../../public/assets/svg/arrow-left.svg';
import ArrowRight from '../../../../../../public/assets/svg/arrow-right.svg';

interface File {
  fileUrl: string;
  isPhoto: boolean;
  isVideo: boolean;
}

interface ImageSliderProps {
  files: File[];
  onImageChange?: (url: string) => void;
}

export default function ImageSlider({
  files,
  onImageChange,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (onImageChange) {
      onImageChange(files[currentIndex].fileUrl);
    }

    if (files[currentIndex].isVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex, files, onImageChange]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? files.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === files.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl">
        {files[currentIndex].isPhoto ? (
          <img
            src={files[currentIndex].fileUrl}
            alt={`slide-${currentIndex}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={files[currentIndex].fileUrl}
            className="h-full w-full object-cover"
            width="100%"
            height="100%"
            controls
            style={{ zIndex: 10 }}
            controlsList="nodownload"
          />
        )}
      </div>

      {/* 좌우 이동 버튼 */}
      {files.length > 1 && (
        <>
          <div
            className="absolute left-0 top-0 z-20 flex h-full w-full 
            items-center justify-between"
            style={{ pointerEvents: 'none' }}
          >
            <button
              onClick={goToPrevious}
              className="z-30 p-2 py-8 pr-8 text-white"
              style={{ pointerEvents: 'auto' }}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={goToNext}
              className="z-30 p-2 py-8 pl-8 text-white"
              style={{ pointerEvents: 'auto' }}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}

      {/* 페이지 인디케이터 */}
      {files.length > 1 && (
        <div
          className="absolute bottom-0 left-0 z-20 
          flex w-full items-center justify-center p-3"
          style={{ pointerEvents: 'none' }}
        >
          {files.map((_, index) => (
            <div
              key={index}
              className={`mx-2 h-2 w-2 cursor-pointer rounded-full 
              ${index === currentIndex ? 'bg-darkPurple' : 'bg-addFolderGray'}`}
              onClick={() => setCurrentIndex(index)}
              style={{ pointerEvents: 'auto' }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
