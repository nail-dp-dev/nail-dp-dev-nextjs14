'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusButtonProps } from '../../constants/interface';

export default function PlusButton({ isClicked }: PlusButtonProps) {
  const [isClick, setIsClick] = useState(isClicked);
  const [isBackGround, setIsBackGround] = useState(isClicked);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
    setIsAnimate(true)
    setTimeout(() => {
      setIsBackGround(!isBackGround);
    }, 300);
  };

  return (
    <div className="w-[24px] h-[24px] mt-[10px]">
      <motion.svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        animate={
          isAnimate ? { scale: isClick ? [1, 1.2, 1, 1] : [1, 1.2, 1] } : {}
        }
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <circle
          cx="12.5"
          cy="12"
          r="12"
          fill={isBackGround ? 'white' : '#B98CE0'}
        />
        <motion.path
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 12C21 12.4142 20.6642 12.75 20.25 12.75H12.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V12.75H3.75C3.33579 12.75 3 12.4142 3 12C3 11.5858 3.33579 11.25 3.75 11.25H11.25V3.75C11.25 3.33579 11.5858 3 12 3C12.4142 3 12.75 3.33579 12.75 3.75V11.25H20.25C20.6642 11.25 21 11.5858 21 12Z"
          initial={isAnimate ? { scale: isClick ? 1 : 0 } : {}}
          animate={{ scale: isClick ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {isAnimate ? (
          <motion.path
            fill="#B98CE0"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 24C10.5409 16.0003 8.74969 14.2091 0.75 12C8.74969 9.79094 10.5409 7.99969 12.75 0C14.9591 7.99969 16.7503 9.79094 24.75 12C16.7503 14.2091 14.9591 16.0003 12.75 24Z"
            initial={isAnimate ? { scale: isClick ? 0 : 1 } : {}}
            animate={{ scale: isClick ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isClick ? 0.3 : 0 }}
          />
        ) : (
          <></>
        )}
      </motion.svg>
    </div>
  );
}
