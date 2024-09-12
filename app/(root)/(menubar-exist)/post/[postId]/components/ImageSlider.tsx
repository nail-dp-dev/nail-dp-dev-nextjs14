'use client';

import React, { useState, useEffect } from 'react';
import Video from '../../../../../../components/ui/Video';
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

// 이미지 슬라이드
export default function ImageSlider({
  files,
  onImageChange,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (onImageChange) {
      onImageChange(files[currentIndex].fileUrl);
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
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        {files[currentIndex].isPhoto ? (
          <img
            src={files[currentIndex].fileUrl}
            alt={`slide-${currentIndex}`}
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <Video src={files[currentIndex].fileUrl} width="100%" height="100%" />
        )}
      </div>
      {files.length > 1 && (
        <>
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between">
            <button onClick={goToPrevious} className="p-2 py-8 pr-8 text-white">
              <ArrowLeft />
            </button>
            <button onClick={goToNext} className="p-2 py-8 pl-8 text-white">
              <ArrowRight />
            </button>
          </div>
        </>
      )}
      {files.length > 1 && (
        <div className="absolute bottom-0 left-0 flex w-full items-center justify-center p-2">
          {files.map((_, index) => (
            <div
              key={index}
              className={`mx-2 h-2 w-2 cursor-pointer rounded-full ${
                index === currentIndex ? 'bg-darkPurple' : 'bg-addFolderGray'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
