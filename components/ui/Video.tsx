'use client';

import React, { useRef } from 'react';
import { VideoProps } from '../../constants/interface';

const Video: React.FC<VideoProps> = ({ src, width, height }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      loop
      muted
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;