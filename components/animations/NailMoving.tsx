import React from 'react';
import NailLogoIcon from '../../public/assets/svg/nail-logo.svg';

export default function NailMoving() {
  return (
    <div
      className="z-10 absolute md:top-1/3 top-[54%] left-1/2 
    transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="animate-fadeInOutFloat">
        <NailLogoIcon />
      </div>
    </div>
  );
}
