"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeartIcon from "../../public/assets/svg/heart.svg";
import { IconHeartButtonProps } from "../../constants/interface";
import { useDispatch, useSelector } from 'react-redux';
import { selectButtonState, toggleButtonState } from '../../store/slices/getLikedPostsSlice';

export default function HeartButton(
  {
    width,
    height,
    isClicked,
    isGetAllLiked,
  }
  : IconHeartButtonProps
) {
  const [isClick, setIsClick] = useState(isClicked);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isfillRule, setIsfillRule] = useState<"evenodd" | "nonzero">(isClicked ? "nonzero" : "evenodd")
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsClick(!isClick);
    setIsAnimate(true); 
    setTimeout(() =>{
      setIsfillRule(isClick ? "evenodd":"nonzero")
    }, 300)
    if (isGetAllLiked) {
      dispatch(toggleButtonState());
    }
  };

  return (
    <div className={`width='${width}' height='${height}'`}>
      <motion.div
        transition={{ duration: 0.5 }}
        animate={isAnimate ? {
                scaleX: isClick ? [1, 0.8, 1, 1, 1]:[1, 0.8, 1, 1],
                scaleY: isClick ? [1, 1, 1.2, 0.8, 1, 1]:[1, 1, 1.2, 0.8, 1]
              }:{}
        }
        onClick={() => handleClick()}
        style={{
          cursor: "pointer" ,
        }}
      >
        <HeartIcon width={width} height={height} fillRule={isfillRule} />
      </motion.div>
    </div>
  );
}
