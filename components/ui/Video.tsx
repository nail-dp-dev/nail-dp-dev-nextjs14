'use client';

import React from 'react';
import { VideoProps } from '../../constants/interface';

const Video: React.FC<VideoProps> = ({ src, width, height }) => {
  return (
    <video width={width} height={height} autoPlay={true} loop muted style={{objectFit: 'cover'}}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
