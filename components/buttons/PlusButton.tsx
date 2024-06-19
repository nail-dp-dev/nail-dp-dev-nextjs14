"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlusButton() {
  const [isClick, setIsClick] = useState(false);
  const [isBack, setIsBack] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick);
    setTimeout(() => {
        setIsBack(!isBack)
    },300)
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
        animate={{ scale: isClick ? [1, 1.2, 1, 1]:[1, 1.2, 1]}}
        transition={{ duration: 0.3, delay: 0.3}}
        style={{
          cursor: "pointer",
          outline: "none",
        }}
      >
        <circle cx="12.5" cy="12" r="12" fill={isBack ? "white":"#B98CE0"} />
        <motion.path
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.5 12C21.5 12.4142 21.1642 12.75 20.75 12.75H13.25V20.25C13.25 20.6642 12.9142 21 12.5 21C12.0858 21 11.75 20.6642 11.75 20.25V12.75H4.25C3.83579 12.75 3.5 12.4142 3.5 12C3.5 11.5858 3.83579 11.25 4.25 11.25H11.75V3.75C11.75 3.33579 12.0858 3 12.5 3C12.9142 3 13.25 3.33579 13.25 3.75V11.25H20.75C21.1642 11.25 21.5 11.5858 21.5 12Z"
          initial={{ scale: isClick ? 1 : 0 }}
          animate={{ scale: isClick ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          fill="#B98CE0"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.75 24C10.5409 16.0003 8.74969 14.2091 0.75 12C8.74969 9.79094 10.5409 7.99969 12.75 0C14.9591 7.99969 16.7503 9.79094 24.75 12C16.7503 14.2091 14.9591 16.0003 12.75 24Z"          
          initial={{ scale: isClick ? 0 : 1  }}
          animate={{ scale: isClick ? 1 : 0 }}
          transition={{ duration: 0.3 , delay: isClick ? 0.3 : 0}}
        />
      </motion.svg>
    </div>
  );
}
