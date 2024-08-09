import React from 'react';
import NailLogoIcon from '../public/assets/svg/nail-logo.svg';

export default function Loading() {
  return (
    <div className="w-full h-full bg-white dark:bg-themeDark flex items-center justify-center rounded-2xl z-40">
      <div className="animate-fadeInOutFloat">
        <NailLogoIcon />
      </div>
    </div>
  );
}
