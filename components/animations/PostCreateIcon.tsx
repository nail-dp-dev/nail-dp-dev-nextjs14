'use client';

import Link from 'next/link';
import { postBoxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectNumberOfBoxes } from '../../store/slices/boxLayoutSlice';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CreatePost() {
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );

  let layoutNum = numberOfBoxes;
  const [isHover, setIsHover] = useState(false);
  const [isHoverTime, setIsHoverTime] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  return (
    <div
      className="box relative mb-[16px] rounded-2xl overflow-hidden transition-all duration-500 border-[5px] border-dashed border-purple p-[5px] snap-start"
      style={{ width: postBoxWidths[layoutNum] }}
    >
      <Link href={`/post/create`} className="absolute inset-0 z-0">
        <div
          className="w-full h-full flex items-center justify-center"
          onMouseEnter={() => {setIsHover(true),setIsAnimate(true), setTimeout(()=>{
            setIsHoverTime(true)
          },300)}}
          onMouseLeave={() => {setIsHover(false), setTimeout(()=>{
            setIsHoverTime(false)
          },300)}}
        >
          <motion.svg
            className="w-[50%]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="50"
              fill={ isHoverTime ? "#B98CE0":"#F2F2F5"}
              animate={isHoverTime ? { opacity: isHover ? 1 : 0 }:{ opacity: isHover ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M87.5 50C87.5 51.7259 86.1009 53.125 84.375 53.125H53.125V84.375C53.125 86.1009 51.7259 87.5 50 87.5C48.2741 87.5 46.875 86.1009 46.875 84.375V53.125H15.625C13.8991 53.125 12.5 51.7259 12.5 50C12.5 48.2741 13.8991 46.875 15.625 46.875H46.875V15.625C46.875 13.8991 48.2741 12.5 50 12.5C51.7259 12.5 53.125 13.8991 53.125 15.625V46.875H84.375C86.1009 46.875 87.5 48.2741 87.5 50Z"
              fill="#B98CE0"
              initial={isAnimate ? { scale: isHover ? 1 : 0 }:""}
              animate={isAnimate ? { scale: isHover ? 0 : 1 }:""}
              transition={{ duration: 0.3 }}
            />
             {isHoverTime ? <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M87.5 50C87.5 51.7259 86.1009 53.125 84.375 53.125H53.125V84.375C53.125 86.1009 51.7259 87.5 50 87.5C48.2741 87.5 46.875 86.1009 46.875 84.375V53.125H15.625C13.8991 53.125 12.5 51.7259 12.5 50C12.5 48.2741 13.8991 46.875 15.625 46.875H46.875V15.625C46.875 13.8991 48.2741 12.5 50 12.5C51.7259 12.5 53.125 13.8991 53.125 15.625V46.875H84.375C86.1009 46.875 87.5 48.2741 87.5 50Z"
              fill="#F2F2F5"
              initial={{ scale: isHover ? 0 : 1}}
              animate={{ scale: isHover ? 1 : 0}}
              transition={{ duration: 0.3 }}
            />:""}
          </motion.svg>
        </div>
      </Link>
    </div>
  );
}
