import React from 'react';
import Image from 'next/image';

type UserImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function UserImage({ src, alt, width, height }: UserImageProps) {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="rounded-full"
      />
    </div>
  );
}
